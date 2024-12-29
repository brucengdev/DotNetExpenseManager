using Backend.Controllers;
using Backend.Manager;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Shouldly;

namespace Backend.Tests.Controller;

public class AccountControllerTests
{
    [Fact]
    public void Must_be_controller()
    {
        Attribute.GetCustomAttribute(typeof(AccountController), typeof(ApiControllerAttribute))
            .ShouldNotBeNull();
        
        typeof(AccountController).BaseType
            .IsAssignableTo(typeof(ControllerBase)).ShouldBeTrue();
    }

    [Fact]
    public void Login_must_succeed_with_correct_username_and_password()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(m => m.VerifyUser(
                It.IsAny<string>(),
                It.IsAny<string>()))
            .Returns(true);
        var sut = new AccountController(accountManager.Object);
        
        //act
        ActionResult<bool> result = sut.Login("johndoe", "testpassword");
        
        //assert
        result.Result.ShouldBeOfType<OkObjectResult>();
        (result.Result as OkObjectResult).Value.ShouldBe(true);
    }
    
    [Fact]
    public void Login_must_fail_with_incorrect_username_and_password_with_status_code_401()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(m => m.VerifyUser(
                It.IsAny<string>(),
                It.IsAny<string>()))
            .Returns(false);
        var sut = new AccountController(accountManager.Object);
        
        //act
        ActionResult<bool> result = sut.Login("johndoe", "testpassword");
        
        //assert
        result.Result.ShouldBeOfType<UnauthorizedResult>();
    }
}