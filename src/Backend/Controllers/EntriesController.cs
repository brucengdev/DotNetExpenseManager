using Backend.Manager;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
internal class EntriesController: ControllerBase
{
    private readonly IEntryManager _entryManager;
    internal EntriesController(IEntryManager em, IAccountManager am)
    {
        _entryManager = em;
    }

    [HttpPost("[action]")]
    public ActionResult AddEntry(Entry inputEntry, string accessToken)
    {
        var resolvedEntry = new Entry(inputEntry);
        resolvedEntry.UserId = 12;
        _entryManager.AddEntry(resolvedEntry);
        return Ok();
    }
}