using Backend.Core.Manager;
using Backend.Models;
using Backend.WebApi.ActionFilters;
using Backend.WebApi.Controllers;
using Backend.WebApi.Tests.Mocks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Shouldly;

namespace Backend.WebApi.Tests.Controller;

public partial class TagControllerTests
{
    [Fact]
    public void AddTag_endpoint_config()
    {
        var method = Utils.GetMethod<TagsController>(nameof(TagsController.AddTag));
        method.ShouldNotBeNull();

        var attributes = method?.GetCustomAttributes(typeof(HttpPostAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);

        var postAttr = attributes[0] as HttpPostAttribute;
        postAttr.Template.ShouldBeNull();
        
        var secAttrs = method?.GetCustomAttributes(typeof(ServiceFilterAttribute<SecurityFilterAttribute>), true);
        secAttrs.Length.ShouldBeGreaterThan(0, "Must require authorization");
    }
    
    [Fact]
    public void AddTags_must_add_new_tag()
    {
        //arrange
        var tagManager = new TestTagsManager();
        tagManager.AddTag(new(){ Name = "Cat1", UserId = 2 });
        tagManager.AddTag(new(){ Name = "Cat2", UserId = 2 });
        var sut = new TagsController(tagManager);
        sut.ControllerContext = new ControllerContext();
        sut.ControllerContext.HttpContext = new DefaultHttpContext();
        sut.ControllerContext.HttpContext.Items[Constants.USER_ID] = 1;
        
        //act
        var result = sut.AddTag(new Tag()
        {
            Id = 0,
            Name = "Cat3",
            UserId = 0
        });
        
        //assert
        result.ShouldBeOfType<OkResult>();
        var cats = tagManager.GetTags(1);
        cats.ShouldBeEquivalentTo(new List<Tag>
        {
            new () { Id = 3, Name = "Cat3", UserId = 1}
        });
    }
    
    [Fact]
    public void AddTags_must_return_409_if_tag_already_exists()
    {
        //arrange
        var tagManager = new Mock<ITagsManager>();
        tagManager.Setup(cm => cm.AddTag(It.IsAny<Tag>()))
            .Throws(new TagAlreadyExistsException());
        var sut = new TagsController(tagManager.Object);
        sut.ControllerContext = new ControllerContext();
        sut.ControllerContext.HttpContext = new DefaultHttpContext();
        sut.ControllerContext.HttpContext.Items[Constants.USER_ID] = 1;
        
        //act
        var result = sut.AddTag(new Tag()
        {
            Id = 0,
            Name = "Cat3",
            UserId = 0
        });
        
        //assert
        result.ShouldBeOfType<ConflictResult>();
    }
}