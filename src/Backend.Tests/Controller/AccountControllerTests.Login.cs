using Backend.Controllers;
using Backend.Manager;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Shouldly;

namespace Backend.Tests.Controller;

public partial class AccountControllerTests
{
    [Fact]
    public void Controller_config()
    {
        Attribute.GetCustomAttribute(typeof(AccountController), typeof(ApiControllerAttribute))
            .ShouldNotBeNull();

        var routeAttr = Attribute.GetCustomAttribute(typeof(AccountController), typeof(RouteAttribute))
            as RouteAttribute;
        routeAttr.ShouldNotBeNull();
        routeAttr.Template.ShouldBe("[controller]");
        
        typeof(AccountController).BaseType
            .IsAssignableTo(typeof(ControllerBase)).ShouldBeTrue();
    }

    [Fact]
    public void Login_endpoint_config()
    {
        var method = typeof(AccountController).GetMethods()
            .SingleOrDefault(x => x.Name == nameof(AccountController.Login));

        var attributes = method?.GetCustomAttributes(typeof(HttpPostAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);
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
