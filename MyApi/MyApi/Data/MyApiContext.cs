using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyApi.Models.Database;

namespace MyApi.Data;

public class MyApiContext: IdentityDbContext<User>
{

    public MyApiContext(DbContextOptions<MyApiContext> options) : base(options)
    {
    }
}