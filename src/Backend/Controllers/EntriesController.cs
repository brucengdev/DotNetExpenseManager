using Backend.Manager;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class EntriesController: ControllerBase
{
    private readonly IEntryManager _entryManager;
    private readonly IAccountManager _accountManager;
    public EntriesController(IEntryManager em, IAccountManager am)
    {
        _entryManager = em;
        _accountManager = am;
    }

    [HttpPost("[action]")]
    public ActionResult AddEntry([FromBody] Entry inputEntry, [FromQuery] string accessToken)
    {
        try
        {
            var resolvedEntry = new Entry(inputEntry);
            resolvedEntry.UserId = _accountManager.GetUserId(accessToken, DateTime.Now);
            resolvedEntry.User = _accountManager.GetById(resolvedEntry.UserId);
            _entryManager.AddEntry(resolvedEntry);
            return Ok();
        }
        catch (UserNotFoundException)
        {
            return Unauthorized();
        }
        catch (TokenExpiredException)
        {
            return Unauthorized();
        }
        catch (MalformedTokenException)
        {
            return Unauthorized();
        }
    }
}