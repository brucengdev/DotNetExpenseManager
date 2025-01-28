using Backend.Core.Manager;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoryController: ControllerBase
{
    private readonly IAccountManager _accountManager;
    private readonly ICategoryManager _categoryManager;
    public CategoryController(
        IAccountManager accountManager,
        ICategoryManager categoryManager
        )
    {
        _accountManager = accountManager;
        _categoryManager = categoryManager;
    }

    [HttpGet("[action]")]
    public ActionResult<IEnumerable<Category>> GetCategories(string accessToken)
    {
        var userId = _accountManager.GetUserId(accessToken, DateTime.Now);
        var result = _categoryManager.GetCategories(userId);
        return Ok(result);
    }
}