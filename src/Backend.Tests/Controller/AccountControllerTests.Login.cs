using Backend.Controllers;
using Backend.Manager;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Shouldly;

namespace Backend.Tests.Controller;

public partial class AccountControllerTests
{
    [Fact]
    public void Login_endpoint_config()
    {
        var method = GetMethod<AccountController>(nameof(AccountController.Login));

        var attributes = method?.GetCustomAttributes(typeof(HttpPostAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);
        
        var postAttr = attributes[0] as HttpPostAttribute;
        postAttr.Template.ShouldBe("[action]");
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
    
    [Fact]
    public void IsLoggedIn_must_return_OK_when_token_is_valid()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(am => am.IsTokenValid(It.IsAny<string>(), It.IsAny<DateTime>()))
            .Returns(true);
        var sut = new AccountController(accountManager.Object);
        
        //act
        ActionResult<string> result = sut.IsLoggedIn("dummyToken");
        
        //assert
        result.Result.ShouldBeOfType<OkResult>();
    }
    
    [Fact]
    public void IsLoggedIn_must_return_Unauthorized_when_token_is_invalid()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(am => am.IsTokenValid(It.IsAny<string>(), It.IsAny<DateTime>()))
            .Returns(false);
        var sut = new AccountController(accountManager.Object);
        
        //act
        ActionResult<string> result = sut.IsLoggedIn("dummyToken");
        
        //assert
        result.Result.ShouldBeOfType<UnauthorizedResult>();
    }
}
