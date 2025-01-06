using Backend.Manager;
using Backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
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
    public ActionResult AddEntry([FromBody] EntryPlain inputEntry, [FromQuery] string accessToken)
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

    [HttpGet("[action]")]
    public ActionResult<IEnumerable<EntryPlain>> GetByDate(DateTime date, string accessToken)
    {
        try
        {
            var userId = _accountManager.GetUserId(accessToken, DateTime.Now);
            var result = _entryManager.GetByDate(date, userId)
                .Select(e => new EntryPlain(e));
            return Ok(result);
        }
        catch (UserNotFoundException)
        {
            return Unauthorized();
        }
    }
}