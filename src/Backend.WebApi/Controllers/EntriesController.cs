using Backend.Core.Manager;
using Backend.Models;
using Backend.WebApi.ActionFilters;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApi.Controllers;

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
    [ServiceFilter<SecurityFilterAttribute>]
    public ActionResult AddEntry([FromBody] EntryPlain inputEntry)
    {
        var userId = HttpContext.Items[Constants.USER_ID] as int?;
        var resolvedEntry = new Entry(inputEntry);
        resolvedEntry.UserId = userId.Value;
        resolvedEntry.User = _accountManager.GetById(resolvedEntry.UserId);
        _entryManager.AddEntry(resolvedEntry);
        return Ok();
    }

    [HttpGet("[action]")]
    [ServiceFilter<SecurityFilterAttribute>]
    public ActionResult<IEnumerable<EntryPlain>> GetByDate(DateTime date)
    {
        try
        {
            var userId = HttpContext.Items[Constants.USER_ID] as int?;
            var result = _entryManager.GetByDate(date, userId.Value)
                .Select(e => new EntryPlain(e));
            return Ok(result);
        }
        catch (UserNotFoundException)
        {
            return Unauthorized();
        }
    }

    [HttpDelete("[action]")]
    [ServiceFilter<SecurityFilterAttribute>]
    public ActionResult Delete(int id)
    {
        try
        {
            _entryManager.DeleteEntry(id);
            return Ok();
        }
        catch (EntryNotFoundException)
        {
            return NotFound();
        }
    }
}