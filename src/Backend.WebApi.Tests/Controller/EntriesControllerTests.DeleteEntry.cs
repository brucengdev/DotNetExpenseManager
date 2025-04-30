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
    public void DeleteEntry_endpoint_config()
    {
        var method = Utils.GetMethod<EntriesController>(nameof(EntriesController.Delete));
        method.ShouldNotBeNull();

        var attributes = method?.GetCustomAttributes(typeof(HttpDeleteAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);

        var deleteAttr = attributes[0] as HttpDeleteAttribute;
        deleteAttr.Template.ShouldBe("[action]");
        
        attributes = method?.GetCustomAttributes(typeof(ServiceFilterAttribute<SecurityFilterAttribute>), true);
        attributes.Length.ShouldBeGreaterThan(0, "Must require authorization");
    }
    
    [Fact]
    public void DeleteEntry_is_successful()
    {
        //arrange
        var entryManager = new Mock<IEntryManager>();
        var accountManager = new Mock<IAccountManager>();
        var sut = new EntriesController(entryManager.Object, accountManager.Object);
    
        //act
        var result = sut.Delete(1);
    
        //assert
        entryManager.Verify(em => em.DeleteEntry(1), Times.Exactly(1));
        entryManager.VerifyNoOtherCalls();
        result.ShouldBeOfType<OkResult>();
    }

    [Fact]
    public void DeleteEntry_returns_not_found_if_entry_does_not_exist()
    {
        //arrange
        var entryManager = new Mock<IEntryManager>();
        entryManager.Setup(em => em.DeleteEntry(1)).Throws<EntryNotFoundException>();
        var accountManager = new Mock<IAccountManager>();
        var sut = new EntriesController(entryManager.Object, accountManager.Object);
    
        //act
        var result = sut.Delete(1);
    
        //assert
        entryManager.Verify(em => em.DeleteEntry(1), Times.Exactly(1));
        entryManager.VerifyNoOtherCalls();
        result.ShouldBeOfType<NotFoundResult>();
    }
}