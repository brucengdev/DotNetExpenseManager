using Backend.Core.Manager;
using Backend.Models;
using Backend.WebApi.ActionFilters;
using Backend.WebApi.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Shouldly;

namespace Backend.WebApi.Tests.Controller;

public partial class TagControllerTests
{
    [Fact]
    public void GetTags_endpoint_config()
    {
        var method = Utils.GetMethod<TagsController>(nameof(TagsController.GetTags));
        method.ShouldNotBeNull();

        var attributes = method?.GetCustomAttributes(typeof(HttpGetAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);

        var getAttr = attributes[0] as HttpGetAttribute;
        getAttr.Template.ShouldBeNull();
        
        var secAttrs = method?.GetCustomAttributes(typeof(ServiceFilterAttribute<SecurityFilterAttribute>), true);
        secAttrs.Length.ShouldBeGreaterThan(0, "Must require authorization");
    }
    
    [Fact]
    public void GetTags_must_return_categories_for_user()
    {
        //arrange
        var categoryManager = new Mock<ITagsManager>();
        categoryManager.Setup(cm => cm.GetTags(1))
            .Returns(new List<Tag>
            {
                new() {Id = 1, Name = "Tag 1", UserId = 1},
                new() {Id = 2, Name = "Tag 2", UserId = 1}
            });
        var sut = new TagsController(categoryManager.Object);
        sut.ControllerContext = new ControllerContext();
        sut.ControllerContext.HttpContext = new DefaultHttpContext();
        sut.ControllerContext.HttpContext.Items[Constants.USER_ID] = 1;
        
        //act
        var result = sut.GetTags();
        
        //assert
        result.Result.ShouldBeOfType<OkObjectResult>();
        var okResult = result.Result as OkObjectResult;
        okResult.Value.ShouldBeEquivalentTo(new List<Tag>
        {
            new() {Id = 1, Name = "Tag 1", UserId = 1},
            new() {Id = 2, Name = "Tag 2", UserId = 1}
        });
    }
}