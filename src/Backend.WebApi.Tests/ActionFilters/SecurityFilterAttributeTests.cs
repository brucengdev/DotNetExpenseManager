using Backend.WebApi.ActionFilters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;

namespace Backend.WebApi.Tests.Middleware;

public class SecurityFilterAttributeTests
{
    [Fact]
    public async Task Must_execute_next_middleware_when_valid()
    {
        //arrange
        var sut = new SecurityFilterAttribute();
        
        //act
        var actionContext = new ActionContext();
        actionContext.HttpContext = new DefaultHttpContext();
        actionContext.RouteData = new RouteData();
        actionContext.ActionDescriptor = new ActionDescriptor();
        var context = new ActionExecutingContext(
            actionContext, 
            new List<IFilterMetadata>(),
            new Dictionary<string, object?>(), new object());
        sut.OnActionExecuting(context);
    }
}