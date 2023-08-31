using System.ComponentModel.DataAnnotations;

namespace MyApi.Models.Dto;

public class RegisterDto
{
    [Required]
    public string Username { get; set; }
    
    [Required]
    public string Password { get; set; }
    
    [EmailAddress]
    public string Email { get; set; }
}