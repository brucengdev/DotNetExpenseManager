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
    public void GetByDate_endpoint_config()
    {
        var method = Utils.GetMethod<EntriesController>(nameof(EntriesController.GetByDate));
        method.ShouldNotBeNull();

        var attributes = method?.GetCustomAttributes(typeof(HttpGetAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);

        var getAttr = attributes[0] as HttpGetAttribute;
        getAttr.Template.ShouldBe("[action]");
    }

    [Fact]
    public void GetByDate_return_successfully()
    {
        //arrange
        var date = new DateTime(2022, 11, 3);
        var entryManager = new Mock<IEntryManager>();
        var expected = new List<Entry>
        {
            new() { Date = date, Value = -12, UserId = 1, Title = "test", Id = 4 },
            new() { Date = date, Value = -11, UserId = 1, Title = "test2", Id = 5 }
        };
        entryManager.Setup(em => em.GetByDate(date))
            .Returns(expected);
        var accountManager = new Mock<IAccountManager>();
        
        //act
        var sut = new EntriesController(entryManager.Object, accountManager.Object);
        var result = sut.GetByDate(date);

        //assert
        result.Result.ShouldBeOfType<OkObjectResult>();
        var value = (result.Result as OkObjectResult).Value;
        value.ShouldBeAssignableTo<IEnumerable<EntryPlain>>();
        var entries = value as IEnumerable<EntryPlain>;
        entries.Count().ShouldBe(2);
    }
    
}