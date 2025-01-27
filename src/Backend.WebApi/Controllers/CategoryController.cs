using Backend.Core.Manager;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoryController: ControllerBase
{
    public CategoryController(IAccountManager accountManager)
    {
        
    }
}