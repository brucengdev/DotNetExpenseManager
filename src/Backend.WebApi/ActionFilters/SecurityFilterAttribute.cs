using Backend.Core.Manager;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend.WebApi.ActionFilters;

public class SecurityFilterAttribute: IActionFilter
{
    private readonly IAccountManager _accountManager;
    public SecurityFilterAttribute(IAccountManager accountManager)
    {
        _accountManager = accountManager;
    }
    
    public void OnActionExecuting(ActionExecutingContext context)
    {
        var accessToken = context.HttpContext.Request.Query["accessToken"][0];
        try
        {
            var userId = _accountManager.GetUserId(accessToken, DateTime.Now);
        }
        catch (UserNotFoundException unfe)
        {
            //cancel the pipeline;
            context.Result = new UnauthorizedResult();
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        // Do something after the action executes.
    }
}