using Backend.Core.Manager;
using Backend.Core.Tests.Mocks;
using Backend.Models;

namespace Backend.Core.Tests;

public class CategoryManagerTests
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
        
        
    }
}