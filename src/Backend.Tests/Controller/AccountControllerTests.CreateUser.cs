using Backend.Controllers;
using Backend.Manager;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Shouldly;

namespace Backend.Tests.Controller;

public partial class AccountControllerTests
{
    [Fact]
    public void CreateUser_must_success()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(am => am.CreateUser(It.IsAny<string>(), It.IsAny<string>()))
            .Returns(true);
        var sut = new AccountController(accountManager.Object);
        
        //act
        ActionResult<bool> result = sut.CreateUser("johndoe", "testpass");
        
        //assert
        accountManager.Verify(am => am.CreateUser("johndoe", "testpass"), Times.Exactly(1));
        accountManager.VerifyNoOtherCalls();
        result.Result.ShouldBeOfType<OkResult>();
    }

    [Fact]
    public void CreateUser_endpoint_config()
    {
        var method = typeof(AccountController).GetMethods()
            .SingleOrDefault(x => x.Name == nameof(AccountController.CreateUser));

        var attributes = method?.GetCustomAttributes(typeof(HttpPostAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);
    }
}
