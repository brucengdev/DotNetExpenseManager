using System.Reflection;
using Backend.Controllers;
using Microsoft.AspNetCore.Mvc;
using Shouldly;

namespace Backend.Tests.Controller;

public partial class AccountControllerTests
{
    
    private static MethodInfo? GetMethod<TClass>(string methodName)
    {
        return typeof(TClass).GetMethods()
            .SingleOrDefault(x => x.Name == methodName);
    }
    
    [Fact]
    public void Controller_config()
    {
        Attribute.GetCustomAttribute(typeof(AccountController), typeof(ApiControllerAttribute))
            .ShouldNotBeNull();

        var routeAttr = Attribute.GetCustomAttribute(typeof(AccountController), typeof(RouteAttribute))
            as RouteAttribute;
        routeAttr.ShouldNotBeNull();
        routeAttr.Template.ShouldBe("[controller]");
        
        typeof(AccountController).BaseType
            .IsAssignableTo(typeof(ControllerBase)).ShouldBeTrue();
    }
}
