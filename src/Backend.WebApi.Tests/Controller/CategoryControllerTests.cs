using Backend.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Shouldly;

namespace Backend.WebApi.Tests.Controller;

public partial class CategoryControllerTests
{
    [Fact]
    public void Controller_config()
    {
        typeof(CategoryController).IsVisible.ShouldBeTrue();
        
        Attribute.GetCustomAttribute(typeof(CategoryController), typeof(ApiControllerAttribute))
            .ShouldNotBeNull();

        var routeAttr = Attribute.GetCustomAttribute(typeof(CategoryController), typeof(RouteAttribute))
            as RouteAttribute;
        routeAttr.ShouldNotBeNull();
        routeAttr.Template.ShouldBe("[controller]");
        
        typeof(CategoryController).BaseType
            .IsAssignableTo(typeof(ControllerBase)).ShouldBeTrue();
    }
}