using Backend.Manager;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
public class AccountController: ControllerBase
{
    internal AccountController(IAccountManager accountManager)
    {
    }

    public ActionResult<bool> Login(string username, string password)
    {
        return Ok(true);
    }
}