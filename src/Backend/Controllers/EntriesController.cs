using Backend.Manager;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
internal class EntriesController: ControllerBase
{
    private readonly IEntryManager _entryManager;
    internal EntriesController(IEntryManager em)
    {
        _entryManager = em;
    }

    [HttpPost("[action]")]
    public ActionResult AddEntry(Entry inputEntry)
    {
        _entryManager.AddEntry(inputEntry);
        return Ok();
    }
}