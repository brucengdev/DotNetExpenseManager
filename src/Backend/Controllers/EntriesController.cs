using Backend.Manager;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
internal class EntriesController: ControllerBase
{
    private readonly IEntryManager _entryManager;
    private readonly IAccountManager _accountManager;
    internal EntriesController(IEntryManager em, IAccountManager am)
    {
        _entryManager = em;
        _accountManager = am;
    }

    [HttpPost("[action]")]
    public ActionResult AddEntry(Entry inputEntry, string accessToken)
    {
        try
        {
            var resolvedEntry = new Entry(inputEntry);
            resolvedEntry.UserId = _accountManager.GetUserId(accessToken);
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
    }
}