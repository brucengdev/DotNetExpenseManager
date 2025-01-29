using Backend.Core.Manager;
using Backend.Core.Tests.Mocks;
using Backend.Models;
using Shouldly;

namespace Backend.Core.Tests;

public partial class CategoryManagerTests
{
    [Fact]
    public void GetCategories_must_return()
    {
        //arrange
        var categoryRepo = new TestCategoryRepository();
        categoryRepo.Categories = new List<Category>()
        {
            new() { Id = 1, Name = "household", UserId = 1 },
            new() { Id = 2, Name = "Leisure", UserId = 1 },
            new() { Id = 3, Name = "Travel", UserId = 2 }
        };
        var sut = new CategoryManager(categoryRepo);
        
        //act
        var categories = sut.GetCategories(1);
        
        //assert
        categories.ShouldBeEquivalentTo(new List<Category>()
        {
            new() { Id = 1, Name = "household", UserId = 1 },
            new() { Id = 2, Name = "Leisure", UserId = 1 },
        });
    }
    
    [Fact]
    public void GetCategories_must_return_nothing_when_no_match()
    {
        //arrange
        var categoryRepo = new TestCategoryRepository();
        categoryRepo.Categories = new List<Category>()
        {
            new() { Id = 1, Name = "household", UserId = 1 },
            new() { Id = 2, Name = "Leisure", UserId = 1 },
            new() { Id = 3, Name = "Travel", UserId = 2 }
        };
        var sut = new CategoryManager(categoryRepo);
        
        //act
        var categories = sut.GetCategories(3);
        
        //assert
        categories.ShouldBeEmpty();
    }
}