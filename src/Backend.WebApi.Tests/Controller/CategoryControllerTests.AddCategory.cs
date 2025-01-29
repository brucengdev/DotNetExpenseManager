using Backend.Core.Manager;
using Backend.Models;
using Backend.WebApi.ActionFilters;
using Backend.WebApi.Controllers;
using Backend.WebApi.Tests.Mocks;
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
        var categoryManager = new TestCategoryManager();
        var sut = new CategoryController(categoryManager);
        sut.ControllerContext = new ControllerContext();
        sut.ControllerContext.HttpContext = new DefaultHttpContext();
        sut.ControllerContext.HttpContext.Items[Constants.USER_ID] = 1;
        
        //act
        var result = sut.AddCategory(new Category()
        {
            Id = 0,
            Name = "Category 1",
            UserId = 0
        });
        
        //assert
        result.ShouldBeOfType<OkResult>();
        var cats = categoryManager.GetCategories(1);
        cats.ShouldBeEquivalentTo(new List<Category>
        {
            new () { Id = 1, Name = "Category 1", UserId = 1}
        });
    }
}