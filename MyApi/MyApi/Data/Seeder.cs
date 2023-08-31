using Microsoft.AspNetCore.Identity;
using MyApi.Auth;
using MyApi.Models.Database;

namespace MyApi.Data;


public class Seeder {
    public static async Task Seed(IServiceProvider serviceProvider) {
        using var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        using var userManager = serviceProvider.GetService<UserManager<User>>();


        // seed roles
        if(!await roleManager.RoleExistsAsync(UserRoles.User)) {
            await roleManager.CreateAsync(new IdentityRole(UserRoles.User));
        }

        if(!await roleManager.RoleExistsAsync(UserRoles.Admin)) {
            await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
        }



        if(!(await userManager.GetUsersInRoleAsync(UserRoles.User)).Any()) {
            var user  = new User{
                Email = "test@email.com",
                UserName = "test"
            };
            await userManager.CreateAsync(user, "@TestPassword123");
            await userManager.AddToRoleAsync(user, UserRoles.User);
        }

        if(!(await userManager.GetUsersInRoleAsync(UserRoles.Admin)).Any()) {
            var user  = new User{
                Email = "admin@email.com",
                UserName = "admin"
            };
            await userManager.CreateAsync(user, "@AdminPassword123");
            await userManager.AddToRoleAsync(user, UserRoles.Admin);
        }
    }
}