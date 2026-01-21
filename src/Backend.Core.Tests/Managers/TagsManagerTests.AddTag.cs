using Backend.Core.Manager;
using Backend.Core.Tests.Mocks;
using Backend.Models;
using Shouldly;

namespace Backend.Core.Tests;

public partial class TagsManagerTests
{
    [Fact]
    public void AddTag()
    {
        //arrange
        var tagRepo = new TestTagsRepository();
        var sut = new TagsManager(tagRepo);
        
        //act
        sut.AddTag(new Tag()
        {
            Id = 0,
            Name = "Cat1",
            UserId = 1
        });
        
        //assert
        tagRepo.Tags.Count().ShouldBe(1);
        var cat = tagRepo.Tags[0];
        cat.ShouldBe(new()
        {
            Id = 1, Name = "Cat1", UserId = 1
        });
    }
    
    [Fact]
    public void AddTag_must_fail_if_tag_name_exists()
    {
        //arrange
        var tagRepo = new TestTagsRepository();
        tagRepo.AddTag(new Tag()
        {
            Name = "Cat1", UserId = 1
        });
        var sut = new TagsManager(tagRepo);
        
        //act
        var exception = Record.Exception(() => sut.AddTag(new Tag()
        {
            Id = 0,
            Name = "Cat1",
            UserId = 1
        }));
        
        //assert
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<TagAlreadyExistsException>();
        tagRepo.Tags.Count().ShouldBe(1);
    }
}