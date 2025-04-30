using Backend.WebApi.Controllers;
using Backend.Core.Manager;
using Backend.Models;
using Backend.WebApi;
using Backend.WebApi.ActionFilters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Shouldly;

namespace Backend.WebApi.Tests.Controller;

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
        
        var secAttrs = method?.GetCustomAttributes(typeof(ServiceFilterAttribute<SecurityFilterAttribute>), true);
        secAttrs.Length.ShouldBeGreaterThan(0, "Must require authorization");
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
        entryManager.Setup(em => em.GetByDate(date, 1))
            .Returns(expected);
        var accessToken = "dummyToken";
        var accountManager = new Mock<IAccountManager>();
        accountManager.Setup(am => am.GetUserId(accessToken, It.IsAny<DateTime>()))
            .Returns(1);
        var sut = new EntriesController(entryManager.Object, accountManager.Object);
        sut.ControllerContext = new ControllerContext();
        sut.ControllerContext.HttpContext = new DefaultHttpContext();
        sut.ControllerContext.HttpContext.Items[Constants.USER_ID] = 1;
        
        //act
        var result = sut.GetByDate(date);

        //assert
        result.Result.ShouldBeOfType<OkObjectResult>();
        var value = (result.Result as OkObjectResult).Value;
        value.ShouldBeAssignableTo<IEnumerable<EntryPlain>>();
        var entries = value as IEnumerable<EntryPlain>;
        entries.Count().ShouldBe(2);
        entries.ToArray()[0].ShouldBe(expected[0]);
        entries.ToArray()[1].ShouldBe(expected[1]);
    }
}