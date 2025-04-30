using Backend.WebApi.Controllers;
using Backend.Core.Manager;
using Backend.Models;
using Backend.WebApi.ActionFilters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Moq;
using Shouldly;

namespace Backend.WebApi.Tests.Controller;

public partial class EntriesControllerTests
{
    
    [Fact]
    public void AddEntry_endpoint_config()
    {
        var method = Utils.GetMethod<EntriesController>(nameof(EntriesController.AddEntry));
        method.ShouldNotBeNull();

        var attributes = method?.GetCustomAttributes(typeof(HttpPostAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);

        var postAttr = attributes[0] as HttpPostAttribute;
        postAttr.Template.ShouldBe("[action]");
        
        var secAttrs = method?.GetCustomAttributes(typeof(ServiceFilterAttribute<SecurityFilterAttribute>), true);
        secAttrs.Length.ShouldBeGreaterThan(0, "Must require authorization");
    }
    
    [Theory]
    [InlineData(12)]
    [InlineData(15)]
    public void AddEntry_is_successful(int userId)
    {
        //arrange
        var inputEntry = new EntryPlain
        {
            Title = "Grocery",
            Value = -123.22f,
            Date = new DateTime(2024, 3, 12)
        };
        var entryManager = new Mock<IEntryManager>();
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(
                am => am.GetById(userId))
            .Returns(new User
            {
                Id = userId
            });
        var sut = new EntriesController(entryManager.Object, accountManager.Object);

        //act
        sut.ControllerContext.HttpContext = new DefaultHttpContext();
        sut.ControllerContext.HttpContext.Items[Constants.USER_ID] = userId;
        var result = sut.AddEntry(inputEntry);

        //assert
        var verifyEntry = (Entry e) =>
        {
            return e.Title == "Grocery"
                   && e.Value == -123.22f
                   && e.Date == new DateTime(2024, 3, 12)
                   && e.UserId == userId;
        };
        entryManager.Verify(em => em.AddEntry(
            It.Is<Entry>(e => verifyEntry(e))), Times.Exactly(1));
        entryManager.VerifyNoOtherCalls();
        result.ShouldBeOfType<OkResult>();
    }
}