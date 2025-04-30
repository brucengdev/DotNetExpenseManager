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
        
        var secAttrs = method?.GetCustomAttributes(typeof(ServiceFilterAttribute<SecurityFilterAttribute>), true);
        secAttrs.Length.ShouldBeGreaterThan(0, "Must require authorization");
    }
    
    [Fact]
    public void AddCategories_must_add_new_category()
    {
        //arrange
        var categoryManager = new TestCategoryManager();
        categoryManager.AddCategory(new(){ Name = "Cat1", UserId = 2 });
        categoryManager.AddCategory(new(){ Name = "Cat2", UserId = 2 });
        var sut = new CategoryController(categoryManager);
        sut.ControllerContext = new ControllerContext();
        sut.ControllerContext.HttpContext = new DefaultHttpContext();
        sut.ControllerContext.HttpContext.Items[Constants.USER_ID] = 1;
        
        //act
        var result = sut.AddCategory(new Category()
        {
            Id = 0,
            Name = "Cat3",
            UserId = 0
        });
        
        //assert
        result.ShouldBeOfType<OkResult>();
        var cats = categoryManager.GetCategories(1);
        cats.ShouldBeEquivalentTo(new List<Category>
        {
            new () { Id = 3, Name = "Cat3", UserId = 1}
        });
    }
    
    [Fact]
    public void AddCategories_must_return_409_if_category_already_exists()
    {
        //arrange
        var categoryManager = new Mock<ICategoryManager>();
        categoryManager.Setup(cm => cm.AddCategory(It.IsAny<Category>()))
            .Throws(new CategoryAlreadyExistsException());
        var sut = new CategoryController(categoryManager.Object);
        sut.ControllerContext = new ControllerContext();
        sut.ControllerContext.HttpContext = new DefaultHttpContext();
        sut.ControllerContext.HttpContext.Items[Constants.USER_ID] = 1;
        
        //act
        var result = sut.AddCategory(new Category()
        {
            Id = 0,
            Name = "Cat3",
            UserId = 0
        });
        
        //assert
        result.ShouldBeOfType<ConflictResult>();
    }
}