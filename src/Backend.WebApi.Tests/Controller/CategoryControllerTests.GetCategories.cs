using Backend.Core.Manager;
using Backend.Models;
using Backend.WebApi.ActionFilters;
using Backend.WebApi.Controllers;
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
        
        var secAttrs = method?.GetCustomAttributes(typeof(ServiceFilterAttribute), true);
        secAttrs.Length.ShouldBeGreaterThan(0);

        var secAttr = secAttrs[0] as ServiceFilterAttribute;
        secAttr.ServiceType.ShouldBe(typeof(SecurityFilterAttribute));
    }
    
    [Fact]
    public void GetCategories_must_return_categories_for_user()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(am => am.GetUserId("dummyToken", It.IsAny<DateTime>()))
            .Returns(1);
        var categoryManager = new Mock<ICategoryManager>();
        categoryManager.Setup(cm => cm.GetCategories(1))
            .Returns(new List<Category>
            {
                new() {Id = 1, Name = "Category 1", UserId = 1},
                new() {Id = 2, Name = "Category 2", UserId = 1}
            });
        var sut = new CategoryController(accountManager.Object, categoryManager.Object);
        
        //act
        var result = sut.GetCategories("dummyToken");
        
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