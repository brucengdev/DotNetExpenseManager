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
    public void CreateUser_must_success()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(am => am.CreateUser(It.IsAny<string>(), It.IsAny<string>()))
            .Returns(CreateUserResult.Success);
        var sut = new AccountController(accountManager.Object);
        
        //act
        ActionResult<bool> result = sut.CreateUser("johndoe", "testpass");
        
        //assert
        accountManager.Verify(am => am.CreateUser("johndoe", "testpass"), Times.Exactly(1));
        accountManager.VerifyNoOtherCalls();
        result.Result.ShouldBeOfType<OkResult>();
    }
    
    [Fact]
    public void CreateUser_must_fail_when_user_already_exists()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(am => am.CreateUser(It.IsAny<string>(), It.IsAny<string>()))
            .Returns(CreateUserResult.AlreadyExists);
        var sut = new AccountController(accountManager.Object);
        
        //act
        ActionResult<bool> result = sut.CreateUser("johndoe", "testpass");
        
        //assert
        accountManager.Verify(am => am.CreateUser("johndoe", "testpass"), Times.Exactly(1));
        accountManager.VerifyNoOtherCalls();
        result.Result.ShouldBeOfType<ForbidResult>();
    }

    [Fact]
    public void CreateUser_endpoint_config()
    {
        var method = Utils.GetMethod<AccountController>(nameof(AccountController.CreateUser));
        method.ShouldNotBeNull();

        var attributes = method?.GetCustomAttributes(typeof(HttpPostAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);

        var postAttr = attributes[0] as HttpPostAttribute;
        postAttr.Template.ShouldBe("[action]");
        
        var secAttrs = method?.GetCustomAttributes(typeof(ServiceFilterAttribute<SecurityFilterAttribute>), true);
        secAttrs.Length.ShouldBeGreaterThan(0, "Must require authorization");
    }
}
