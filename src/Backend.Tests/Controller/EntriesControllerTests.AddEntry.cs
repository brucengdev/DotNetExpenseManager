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
        var result = sut.AddEntry(inputEntry);

        //assert
        entryManager.Verify(em => em.AddEntry(It.Is<Entry>(e => e == inputEntry)), Times.Exactly(1));
        entryManager.VerifyNoOtherCalls();
        result.ShouldBeOfType<OkResult>();
    }
}