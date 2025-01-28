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
    [ServiceFilter(typeof(SecurityFilterAttribute))]
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