using Backend.Manager;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController: ControllerBase
{
    private readonly IAccountManager _accountManager;
    public AccountController(IAccountManager accountManager)
    {
        _accountManager = accountManager;
    }
    
    [HttpPost("[action]")]
    public ActionResult<string> Login(
        string username, string password)
    {
        try
        {
            var token = _accountManager.CreateAccessToken(username, password);
            return Ok(token);
        }
        catch (UserNotFoundException)
        {
            return Unauthorized();
        }
        catch (WrongPasswordException)
        {
            return Unauthorized();
        }
    }

    [HttpPost("[action]")]
    public ActionResult<bool> CreateUser(
        [FromForm] string username, 
        [FromForm] string password)
    {
        var result = _accountManager.CreateUser(username, password);
        if (result == CreateUserResult.AlreadyExists)
        {
            return Forbid();
        }
        return Ok();
    }

    public ActionResult IsLoggedIn(string accessToken)
    {
        return Ok();
    }
}