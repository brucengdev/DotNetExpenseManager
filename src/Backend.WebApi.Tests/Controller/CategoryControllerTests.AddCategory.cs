using Backend.Core.Manager;
using Backend.Models;
using Backend.WebApi.ActionFilters;
using Backend.WebApi.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Shouldly;

namespace Backend.WebApi.Tests.Controller;

public partial class CategoryControllerTests
{
    [Fact]
    public void AddCategory_endpoint_config()
    {
        var method = Utils.GetMethod<CategoryController>(nameof(CategoryController.AddCategory));
        method.ShouldNotBeNull();

        var attributes = method?.GetCustomAttributes(typeof(HttpPostAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);

        var postAttr = attributes[0] as HttpPostAttribute;
        postAttr.Template.ShouldBe("[action]");
        
        var secAttrs = method?.GetCustomAttributes(typeof(ServiceFilterAttribute), true);
        secAttrs.Length.ShouldBeGreaterThan(0);

        var secAttr = secAttrs[0] as ServiceFilterAttribute;
        secAttr.ServiceType.ShouldBe(typeof(SecurityFilterAttribute));
    }
    
    [Fact]
    public void AddCategories_must_add_new_category()
    {
        //arrange
        var categoryManager = new Mock<ICategoryManager>();
        var sut = new CategoryController(categoryManager.Object);
        
        //act
        var result = sut.AddCategory(new Category()
        {
            Name = "Category 1",
            UserId = 1
        });
        
        //assert
        result.ShouldBeOfType<OkResult>();
    }
}