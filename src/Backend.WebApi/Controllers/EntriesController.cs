using Backend.Core.Manager;
using Backend.Models;
using Backend.WebApi.ActionFilters;
using Backend.WebApi.Models;
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
    public ActionResult AddEntry([FromBody] EntryServiceModel inputEntry)
    {
        var userId = HttpContext.Items[Constants.USER_ID] as int?;
        inputEntry.UserId = userId.Value;
        _entryManager.AddEntry(inputEntry);
        return Ok();
    }

    [HttpGet("[action]")]
    [ServiceFilter<SecurityFilterAttribute>]
    public ActionResult<IEnumerable<EntryServiceModel>> GetByDate(DateTime date)
    {
        try
        {
            var userId = HttpContext.Items[Constants.USER_ID] as int?;
            var result = _entryManager.GetByDate(date, userId.Value)
                .Select(e => new EntryServiceModel(e));
            return Ok(result);
        }
        catch (UserNotFoundException)
        {
            return Unauthorized();
        }
    }

    [HttpGet]
    [ServiceFilter<SecurityFilterAttribute>]
    public ActionResult<IEnumerable<EntryServiceModel>> GetEntries(
        [FromQuery] DateOnly? fromDate,
        [FromQuery] DateOnly? toDate,
        [FromQuery] string? categoryIds,
        [FromQuery] string? tagIds,
        [FromQuery] string? payeeIds,
        [FromQuery] bool? expenses,
        [FromQuery] bool? income
    )
    {
        try
        {
            var userId = HttpContext.Items[Constants.USER_ID] as int?;
            var parsedCategoryIds = categoryIds?.Split(',').Select(idStr => Convert.ToInt32(idStr)) ?? [];
            var parsedTagIds = tagIds?.Split(',').Select(idStr => Convert.ToInt32(idStr)) ?? [];
            var parsedPayeeIds = payeeIds?.Split(',').Select(idStr => Convert.ToInt32(idStr)) ?? [];
            var result = _entryManager.GetEntries(
                    fromDate, 
                    toDate,
                    parsedCategoryIds,
                    parsedTagIds,
                    parsedPayeeIds,
                    expenses?? true,
                    income?? true,
                    userId.Value)
                .Select(e => new EntryServiceModel(e));
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