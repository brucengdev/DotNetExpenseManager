using Backend.Manager;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController: ControllerBase
{
    private readonly IAccountManager _accountManager;
    internal AccountController(IAccountManager accountManager)
    {
        _accountManager = accountManager;
    }
    
    [HttpPost]
    public ActionResult<bool> Login(string username, string password)
    {
        var validUser = _accountManager.VerifyUser(username, password);
        if (validUser)
        {
            return Ok(true);
        }

        return Unauthorized();
    }

    public ActionResult<bool> CreateUser(string username, string password)
    {
        _accountManager.CreateUser(username, password);
        return Ok();
    }
}