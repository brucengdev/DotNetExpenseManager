using Backend.WebApi.Controllers;
using Backend.Core.Manager;
using Backend.WebApi.ActionFilters;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Shouldly;

namespace Backend.WebApi.Tests.Controller;

public partial class AccountControllerTests
{
    [Fact]
    public void Login_endpoint_config()
    {
        var method = Utils.GetMethod<AccountController>(nameof(AccountController.Login));
        method.ShouldNotBeNull();

        var attributes = method?.GetCustomAttributes(typeof(HttpPostAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);
        
        var postAttr = attributes[0] as HttpPostAttribute;
        postAttr.Template.ShouldBe("[action]");
        
        var secAttrs = method?.GetCustomAttributes(typeof(ServiceFilterAttribute<SecurityFilterAttribute>), true);
        secAttrs.Length.ShouldBe(0, "Must not require authorization");
    }
    
    [Fact]
    public void Login_must_succeed_with_correct_username_and_password()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(m => m.CreateAccessToken(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<DateTime>()))
            .Returns("somedummytoken");
        var sut = new AccountController(accountManager.Object);
        
        //act
        ActionResult<string> result = sut.Login("johndoe", "testpassword");
        
        //assert
        result.Result.ShouldBeOfType<OkObjectResult>();
        (result.Result as OkObjectResult).Value.ShouldBe("somedummytoken");
    }
    
    [Fact]
    public void Login_must_fail_when_password_is_incorrect_with_status_code_401()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(m => m.CreateAccessToken(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<DateTime>()))
            .Throws(new WrongPasswordException());
        var sut = new AccountController(accountManager.Object);
        
        //act
        ActionResult<string> result = sut.Login("johndoe", "testpassword");
        
        //assert
        result.Result.ShouldBeOfType<UnauthorizedResult>();
    }
    
    [Fact]
    public void Login_must_fail_when_user_is_incorrect_with_status_code_401()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(m => m.CreateAccessToken(
                It.IsAny<string>(),
                It.IsAny<string>(),
             It.IsAny<DateTime>())
                )
            .Throws(new UserNotFoundException());
        var sut = new AccountController(accountManager.Object);
        
        //act
        ActionResult<string> result = sut.Login("johndoe", "testpassword");
        
        //assert
        result.Result.ShouldBeOfType<UnauthorizedResult>();
    }

}
