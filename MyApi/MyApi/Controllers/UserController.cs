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


    [HttpGet]
    public async Task<IActionResult> GetUsers() {
        var users = await _userManager.GetUsersInRoleAsync(UserRoles.User);
        return Ok(users);
    }

}