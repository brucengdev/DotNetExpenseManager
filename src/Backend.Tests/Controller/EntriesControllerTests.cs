using Backend.Controllers;
using Microsoft.AspNetCore.Mvc;
using Shouldly;

namespace Backend.Tests.Controller;

public class EntriesControllerTests
{
    
    [Fact]
    public void Controller_config()
    {
        Attribute.GetCustomAttribute(typeof(EntriesController), typeof(ApiControllerAttribute))
            .ShouldNotBeNull();

        var routeAttr = Attribute.GetCustomAttribute(typeof(EntriesController), typeof(RouteAttribute))
            as RouteAttribute;
        routeAttr.ShouldNotBeNull();
        routeAttr.Template.ShouldBe("[controller]");
        
        typeof(EntriesController).BaseType
            .IsAssignableTo(typeof(ControllerBase)).ShouldBeTrue();
    }
}