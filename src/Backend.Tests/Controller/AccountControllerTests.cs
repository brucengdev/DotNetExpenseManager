using Backend.Controllers;
using Backend.Manager;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Shouldly;

namespace Backend.Tests.Controller;

public partial class AccountControllerTests
{
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
