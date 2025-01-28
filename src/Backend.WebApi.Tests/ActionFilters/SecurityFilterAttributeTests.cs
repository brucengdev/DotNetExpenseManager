using Backend.WebApi.ActionFilters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Shouldly;

namespace Backend.WebApi.Tests.ActionFilters;

public class SecurityFilterAttributeTests
{
    [Fact]
    public async Task Must_execute_next_stage_when_valid()
    {
        //arrange
        var sut = new SecurityFilterAttribute();
        
        //act
        var actionContext = new ActionContext();
        var httpContext = new DefaultHttpContext();
        actionContext.HttpContext = httpContext;
        actionContext.RouteData = new RouteData();
        actionContext.ActionDescriptor = new ActionDescriptor();
        var context = new ActionExecutingContext(
            actionContext, 
            new List<IFilterMetadata>(),
            new Dictionary<string, object?>(), new object());
        sut.OnActionExecuting(context);
        
        //assert
        context.Result.ShouldBeNull();
    }
}