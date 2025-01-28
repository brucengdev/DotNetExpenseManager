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
        var actionContext = new ActionContext();
        var httpContext = new DefaultHttpContext();
        var queryString = new QueryString("?accessToken=123");
        httpContext.Request.QueryString = queryString;
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
    
    [Fact]
    public async Task Must_cancel_and_return_401_when_unauthorized()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(am => am.GetUserId("123", It.IsAny<DateTime>()))
            .Throws(new UserNotFoundException());
        var sut = new SecurityFilterAttribute(accountManager.Object);
        
        //act
        var actionContext = new ActionContext();
        var httpContext = new DefaultHttpContext();
        var queryString = new QueryString("?accessToken=123");
        httpContext.Request.QueryString = queryString;
        actionContext.HttpContext = httpContext;
        actionContext.RouteData = new RouteData();
        actionContext.ActionDescriptor = new ActionDescriptor();
        var context = new ActionExecutingContext(
            actionContext, 
            new List<IFilterMetadata>(),
            new Dictionary<string, object?>(), new object());
        sut.OnActionExecuting(context);
        
        //assert
        context.Result.ShouldNotBeNull();
    }
}