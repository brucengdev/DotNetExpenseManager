using Backend.Core.Manager;
using Backend.Models;
using Backend.WebApi.ActionFilters;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoryController: ControllerBase
{
    private readonly ICategoryManager _categoryManager;
    public CategoryController(
        ICategoryManager categoryManager
        )
    {
        _categoryManager = categoryManager;
    }

    [HttpGet("[action]")]
    [ServiceFilter<SecurityFilterAttribute>]
    public ActionResult<IEnumerable<Category>> GetCategories()
    {
        var userId = HttpContext.Items[Constants.USER_ID] as int?;
        var result = _categoryManager.GetCategories(userId.Value);
        return Ok(result);
    }

    [HttpPost("[action]")]
    [ServiceFilter<SecurityFilterAttribute>]
    public ActionResult AddCategory(Category category)
    {
        category.UserId = (HttpContext.Items[Constants.USER_ID] as int?).Value;
        try
        {
            _categoryManager.AddCategory(category);
        }
        catch (CategoryAlreadyExistsException)
        {
            return Conflict();
        }

        return Ok();
    }
}