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
        var validUser = _accountManager.VerifyUser(username, password);
        if (validUser)
        {
            return Ok("dummyToken");
        }

        return Unauthorized();
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
}