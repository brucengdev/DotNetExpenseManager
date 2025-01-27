using Backend.Core.Manager;
using Backend.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Shouldly;

namespace Backend.WebApi.Tests.Controller;

public partial class CategoryControllerTests
{
    [Fact]
    public void GetCategories_must_return_categories_for_user()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        var categoryManager = new Mock<ICategoryManager>();
        var sut = new CategoryController(accountManager.Object);
        
        //act
        var result = sut.GetCategories("dummyToken");
        
        //assert
        result.Result.ShouldBeOfType<OkObjectResult>();
    }
}