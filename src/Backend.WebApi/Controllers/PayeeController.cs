using Backend.Core.Manager;
using Backend.Core.Models;
using Backend.Models;
using Backend.WebApi.ActionFilters;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class PayeeController: ControllerBase
{
    private IPayeeManager _payeeManager;
    public PayeeController(IPayeeManager payeeManager)
    {
        _payeeManager = payeeManager;
    }
    [HttpPost]
    [ServiceFilter<SecurityFilterAttribute>]
    public ActionResult AddPayee([FromBody] NewPayee newPayee)
    {
        var userId = HttpContext.Items[Constants.USER_ID] as int?;
        _payeeManager.AddPayee(newPayee, userId.Value);
        return Created();
    }
}