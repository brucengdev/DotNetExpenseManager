using Backend.Core.Manager;
using Backend.WebApi.ActionFilters;
using Backend.WebApi.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApi.Controllers;

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
        [FromForm] string username,
        [FromForm] string password)
    {
        try
        {
            var token = _accountManager.CreateAccessToken(username, password, DateTime.Now);
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
    [ServiceFilter<SecurityFilterAttribute>]
    public ActionResult<bool> CreateUser(
        [FromForm] string username, 
        [FromForm] string password)
    {
        var user = _accountManager.GetById(this.CurrentUserId());
        if (user.Username != Constants.ADMIN_USERNAME)
        {
            return Unauthorized();
        }
        var result = _accountManager.CreateUser(username, password);
        if (result == CreateUserResult.AlreadyExists)
        {
            return Forbid();
        }
        return Ok();
    }

    [HttpGet("[action]")]
    [ServiceFilter<SecurityFilterAttribute>]
    public ActionResult IsLoggedIn()
    {
        return Ok();
    }
}