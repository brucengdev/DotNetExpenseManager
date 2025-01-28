using Backend.Core.Manager;
using Backend.WebApi.ActionFilters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Moq;
using Shouldly;

namespace Backend.WebApi.Tests.ActionFilters;

public class SecurityFilterAttributeTests
{
    [Fact]
    public async Task Must_execute_next_stage_when_valid()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        var sut = new SecurityFilterAttribute(accountManager.Object);
        
        //act
        var context = CreateActionExecutingContext("?accessToken=123");
        sut.OnActionExecuting(context);
        
        //assert
        context.Result.ShouldBeNull();
    }

    [Fact]
    public async Task Must_cancel_and_return_401_when_user_not_found()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(am => am.GetUserId("123", It.IsAny<DateTime>()))
            .Throws(new UserNotFoundException());
        var sut = new SecurityFilterAttribute(accountManager.Object);
        
        //act
        var context = CreateActionExecutingContext("?accessToken=123");
        sut.OnActionExecuting(context);
        
        //assert
        context.Result.ShouldNotBeNull();
    }
    
    [Fact]
    public async Task Must_cancel_and_return_401_when_token_is_invalid()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(am => am.GetUserId("123", It.IsAny<DateTime>()))
            .Throws(new MalformedTokenException());
        var sut = new SecurityFilterAttribute(accountManager.Object);
        
        //act
        var context = CreateActionExecutingContext("?accessToken=123");
        sut.OnActionExecuting(context);
        
        //assert
        context.Result.ShouldNotBeNull();
    }
    
    private static ActionExecutingContext CreateActionExecutingContext(string queryStringText)
    {
        var actionContext = new ActionContext();
        var httpContext = new DefaultHttpContext();
        var queryString = new QueryString(queryStringText);
        httpContext.Request.QueryString = queryString;
        actionContext.HttpContext = httpContext;
        actionContext.RouteData = new RouteData();
        actionContext.ActionDescriptor = new ActionDescriptor();
        var context = new ActionExecutingContext(
            actionContext, 
            new List<IFilterMetadata>(),
            new Dictionary<string, object?>(), new object());
        return context;
    }
}