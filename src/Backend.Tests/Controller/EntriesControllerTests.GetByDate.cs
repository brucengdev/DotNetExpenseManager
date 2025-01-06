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
        entryManager.Setup(em => em.GetByDate(date))
            .Returns(new List<Entry>
            {
                new() { Date = date, Value = -12, UserId = 1, Title = "test", Id = 4}
            });
        var accountManager = new Mock<IAccountManager>();
        
        //act
        var sut = new EntriesController(entryManager.Object, accountManager.Object);
        var result = sut.GetByDate(date);

        //assert
        result.Result.ShouldBeOfType<OkObjectResult>();
    }
    
}