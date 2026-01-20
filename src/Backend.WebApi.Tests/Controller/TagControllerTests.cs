using Backend.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Shouldly;

namespace Backend.WebApi.Tests.Controller;

public partial class TagControllerTests
{
    [Fact]
    public void Controller_config()
    {
        typeof(TagsController).IsVisible.ShouldBeTrue();
        
        Attribute.GetCustomAttribute(typeof(TagsController), typeof(ApiControllerAttribute))
            .ShouldNotBeNull();

        var routeAttr = Attribute.GetCustomAttribute(typeof(TagsController), typeof(RouteAttribute))
            as RouteAttribute;
        routeAttr.ShouldNotBeNull();
        routeAttr.Template.ShouldBe("[controller]");
        
        typeof(TagsController).BaseType
            .IsAssignableTo(typeof(ControllerBase)).ShouldBeTrue();
    }
}