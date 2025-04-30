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
    public void GetCategories_endpoint_config()
    {
        var method = Utils.GetMethod<CategoryController>(nameof(CategoryController.GetCategories));
        method.ShouldNotBeNull();

        var attributes = method?.GetCustomAttributes(typeof(HttpGetAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);

        var getAttr = attributes[0] as HttpGetAttribute;
        getAttr.Template.ShouldBe("[action]");
        
        var secAttrs = method?.GetCustomAttributes(typeof(ServiceFilterAttribute<SecurityFilterAttribute>), true);
        secAttrs.Length.ShouldBeGreaterThan(0, "Must require authorization");
    }
    
    [Fact]
    public void GetCategories_must_return_categories_for_user()
    {
        //arrange
        var categoryManager = new Mock<ICategoryManager>();
        categoryManager.Setup(cm => cm.GetCategories(1))
            .Returns(new List<Category>
            {
                new() {Id = 1, Name = "Category 1", UserId = 1},
                new() {Id = 2, Name = "Category 2", UserId = 1}
            });
        var sut = new CategoryController(categoryManager.Object);
        sut.ControllerContext = new ControllerContext();
        sut.ControllerContext.HttpContext = new DefaultHttpContext();
        sut.ControllerContext.HttpContext.Items[Constants.USER_ID] = 1;
        
        //act
        var result = sut.GetCategories();
        
        //assert
        result.Result.ShouldBeOfType<OkObjectResult>();
        var okResult = result.Result as OkObjectResult;
        okResult.Value.ShouldBeEquivalentTo(new List<Category>
        {
            new() {Id = 1, Name = "Category 1", UserId = 1},
            new() {Id = 2, Name = "Category 2", UserId = 1}
        });
    }
}