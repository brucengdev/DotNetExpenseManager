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
    public void IsLoggedIn_endpoint_config()
    {
        var method = Utils.GetMethod<AccountController>(nameof(AccountController.IsLoggedIn));
        method.ShouldNotBeNull();

        var attributes = method?.GetCustomAttributes(typeof(HttpGetAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);

        var attribute = attributes[0] as HttpGetAttribute;
        attribute.Template.ShouldBe("[action]");
        
        var secAttrs = method?.GetCustomAttributes(typeof(ServiceFilterAttribute), true);
        secAttrs.Length.ShouldBeGreaterThan(0);
        (secAttrs.First() as ServiceFilterAttribute).ServiceType.ShouldBe(typeof(SecurityFilterAttribute));
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
