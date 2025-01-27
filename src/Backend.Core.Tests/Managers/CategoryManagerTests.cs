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
            new() { Name = "household", UserId = 1 },
            new() { Name = "Leisure", UserId = 1 },
            new() { Name = "Travel", UserId = 2 }
        };
        var sut = new CategoryManager(categoryRepo);
        
    }
}