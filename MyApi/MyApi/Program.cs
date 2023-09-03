using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyApi.Data;
using MyApi.Models.Database;

var builder = WebApplication.CreateBuilder(args);

ConfigurationManager configuration = builder.Configuration;

// Add services to the container.

// For Entity Framework

// builder.Services.AddDbContext<MyApiContext>(options => options.UseSqlServer(configuration.GetConnectionString("ConnStr")));
builder.Services.AddDbContext<MyApiContext>(options => options.UseSqlite(configuration.GetConnectionString(nameof(MyApiContext))));

// For Identity
builder.Services.AddIdentity<User, IdentityRole>(options =>
    {
        // options.SignIn.RequireConfirmedEmail = true;
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.User.RequireUniqueEmail = true;

        
    })
    .AddEntityFrameworkStores<MyApiContext>()
    .AddDefaultTokenProviders();

// Adding Authentication
builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })

// Adding Jwt Bearer
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = configuration["JWT:ValidAudience"],
            ValidIssuer = configuration["JWT:ValidIssuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
        };
    });
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhostOrigin",
        builder =>
        {
            builder.WithOrigins(configuration["FrontendUrl:Dev"])
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowProdOrigin",
        builder =>
        {
            builder.WithOrigins(configuration["FrontendUrl:Prod"])
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});


var app = builder.Build();

using(var scope = app.Services.CreateScope()) {
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try {
        await Seeder.Seed(scope.ServiceProvider);
    } catch(Exception e) {
        logger.LogError("An error occured while trying to seed the DB: {Exception}", e);
        return;
    }
    
    if(app.Environment.IsDevelopment()) {        
        logger.LogInformation("Development environment, applying AllowLocalhostOrigin policy");
        app.UseCors("AllowLocalhostOrigin");
    } else if(app.Environment.IsProduction()) {
        logger.LogInformation("Production environment, applying AllowProdOrigin policy");
        app.UseCors("AllowProdOrigin");
    }
}



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();