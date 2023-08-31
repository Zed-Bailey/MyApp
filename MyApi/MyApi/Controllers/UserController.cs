using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyApi.Auth;
using MyApi.Models.Database;

namespace MyApi.Controllers;

[ApiController]
[Authorize(Roles = UserRoles.Admin)]
[Route("[controller]")]
public class UserController: ControllerBase {


    private readonly UserManager<User> _userManager;
    
    public UserController(UserManager<User> userManager) {
        _userManager = userManager;
    }

    public async Task<IActionResult> GetUsers() {
        return Ok(await _userManager.GetUsersInRoleAsync(UserRoles.User));
    }

}