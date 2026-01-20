using Backend.Core.Manager;
using Backend.Models;
using Backend.WebApi.ActionFilters;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class TagsController: ControllerBase
{
    private readonly ITagsManager _tagsManager;
    public TagsController(
        ITagsManager tagsManager
        )
    {
        _tagsManager = tagsManager;
    }

    [HttpGet]
    [ServiceFilter<SecurityFilterAttribute>]
    public ActionResult<IEnumerable<Category>> GetTags()
    {
        var userId = HttpContext.Items[Constants.USER_ID] as int?;
        var result = _tagsManager.GetTags(userId.Value);
        return Ok(result);
    }

    [HttpPost]
    [ServiceFilter<SecurityFilterAttribute>]
    public ActionResult AddTag(Tag tag)
    {
        tag.UserId = (HttpContext.Items[Constants.USER_ID] as int?).Value;
        try
        {
            _tagsManager.AddTag(tag);
        }
        catch (TagAlreadyExistsException)
        {
            return Conflict();
        }

        return Ok();
    }
}