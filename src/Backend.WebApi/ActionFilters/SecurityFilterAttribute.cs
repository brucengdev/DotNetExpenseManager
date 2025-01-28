using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend.WebApi.ActionFilters;

public class SecurityFilterAttribute: IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        // Do something before the action executes.
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        // Do something after the action executes.
    }
}