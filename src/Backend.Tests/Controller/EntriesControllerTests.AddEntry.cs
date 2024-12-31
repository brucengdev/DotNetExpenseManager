using Backend.Controllers;
using Backend.Manager;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Shouldly;

namespace Backend.Tests.Controller;

public partial class EntriesControllerTests
{
    
    [Fact]
    public void AddEntry_endpoint_config()
    {
        var method = Utils.GetMethod<EntriesController>(nameof(EntriesController.AddEntry));

        var attributes = method?.GetCustomAttributes(typeof(HttpPostAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);

        var postAttr = attributes[0] as HttpPostAttribute;
        postAttr.Template.ShouldBe("[action]");
    }
    
    [Fact]
    public void AddEntry_is_successful()
    {
        //arrange
        var inputEntry = new Entry
        {
            Title = "Grocery",
            Value = -123.22f,
            Date = new DateTime(2024, 3, 12)
        };
        var accessToken = "johndoe-2024-12-07-07-08-09";
        var entryManager = new Mock<IEntryManager>();
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(am => am.GetUserId(accessToken))
            .Returns(12);
        var sut = new EntriesController(entryManager.Object, accountManager.Object);

        //act
        
        var result = sut.AddEntry(inputEntry, accessToken);

        //assert
        var verifyEntry = (Entry e) =>
        {
            return e.Title == "Grocery"
                   && e.Value == -123.22f
                   && e.Date == new DateTime(2024, 3, 12)
                   && e.UserId == 12;
        };
        entryManager.Verify(em => em.AddEntry(
            It.Is<Entry>(e => verifyEntry(e))), Times.Exactly(1));
        entryManager.VerifyNoOtherCalls();
        result.ShouldBeOfType<OkResult>();
    }
    
    [Fact]
    public void AddEntry_returns_unauthorized_when_user_is_invalid()
    {
        //arrange
        var inputEntry = new Entry
        {
            Title = "Grocery",
            Value = -123.22f,
            Date = new DateTime(2024, 3, 12)
        };
        var accessToken = "johndoe-2024-12-07-07-08-09";
        var entryManager = new Mock<IEntryManager>();
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(am => am.GetUserId(accessToken))
            .Throws(new UserNotFoundException());
        var sut = new EntriesController(entryManager.Object, accountManager.Object);

        //act
        
        var result = sut.AddEntry(inputEntry, accessToken);

        //assert
        entryManager.VerifyNoOtherCalls();
        result.ShouldBeOfType<UnauthorizedResult>();
    }
    
    [Fact]
    public void AddEntry_returns_unauthorized_when_token_expired()
    {
        //arrange
        var inputEntry = new Entry
        {
            Title = "Grocery",
            Value = -123.22f,
            Date = new DateTime(2024, 3, 12)
        };
        var accessToken = "johndoe-2024-12-07-07-08-09";
        var entryManager = new Mock<IEntryManager>();
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(am => am.GetUserId(accessToken))
            .Throws(new TokenExpiredException());
        var sut = new EntriesController(entryManager.Object, accountManager.Object);

        //act
        var result = sut.AddEntry(inputEntry, accessToken);

        //assert
        entryManager.VerifyNoOtherCalls();
        result.ShouldBeOfType<UnauthorizedResult>();
    }
}