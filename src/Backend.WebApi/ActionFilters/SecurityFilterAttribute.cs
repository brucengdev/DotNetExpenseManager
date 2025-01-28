using Backend.Core.Manager;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend.WebApi.ActionFilters;

public class SecurityFilterAttribute: ActionFilterAttribute
{
    private readonly IAccountManager _accountManager;
    public SecurityFilterAttribute(IAccountManager accountManager)
    {
        _accountManager = accountManager;
    }
    
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.HttpContext.Request.Query.ContainsKey("accessToken"))
        {
            context.Result = new UnauthorizedResult();
            return;
        }
        var accessToken = context.HttpContext.Request.Query["accessToken"][0];
        try
        {
            var userId = _accountManager.GetUserId(accessToken, DateTime.Now);
            context.HttpContext.Items["UserId"] = userId;
        }
        catch (UserNotFoundException unfe)
        {
            //cancel the pipeline;
            context.Result = new UnauthorizedResult();
        }
        catch (MalformedTokenException mte)
        {
            //cancel the pipeline;
            context.Result = new UnauthorizedResult();
        }
        catch (TokenExpiredException)
        {
            context.Result = new UnauthorizedResult();
        }
    }
}