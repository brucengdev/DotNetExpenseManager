using Backend.Core.Manager;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoryController: ControllerBase
{
    public CategoryController(IAccountManager accountManager)
    {
        
    }

    public ActionResult<IEnumerable<Category>> GetCategories(string accessToken)
    {
        return Ok(new List<Category>());
    }
}