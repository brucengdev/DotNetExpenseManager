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
        var entryManager = new Mock<IEntryManager>();
        var sut = new EntriesController(entryManager.Object);

        //act
        var inputEntry = new Entry
        {
            Title = "Grocery",
            Value = -123.22f,
            Date = new DateTime(2024, 3, 12)
        };
        var accessToken = "johndoe-2024-12-07-07-08-09";
        var result = sut.AddEntry(inputEntry, accessToken);

        //assert
        entryManager.Verify(em => em.AddEntry(It.Is<Entry>(e => e == inputEntry)), Times.Exactly(1));
        entryManager.VerifyNoOtherCalls();
        result.ShouldBeOfType<OkResult>();
    }
}