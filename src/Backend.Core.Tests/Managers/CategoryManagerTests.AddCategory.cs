using Backend.Core.Manager;
using Backend.Core.Tests.Mocks;
using Backend.Models;
using Shouldly;

namespace Backend.Core.Tests;

public partial class CategoryManagerTests
{
    [Fact]
    public void AddCategory()
    {
        //arrange
        var categoryRepo = new TestCategoryRepository();
        var sut = new CategoryManager(categoryRepo);
        
        //act
        sut.AddCategory(new Category()
        {
            Id = 0,
            Name = "Cat1",
            UserId = 1
        });
        
        //assert
        categoryRepo.Categories.Count().ShouldBe(1);
        var cat = categoryRepo.Categories[0];
        cat.ShouldBe(new()
        {
            Id = 1, Name = "Cat1", UserId = 1
        });
    }
    
    [Fact]
    public void AddCategory_must_fail_if_category_name_exists()
    {
        //arrange
        var categoryRepo = new TestCategoryRepository();
        categoryRepo.AddCategory(new Category()
        {
            Name = "Cat1", UserId = 1
        });
        var sut = new CategoryManager(categoryRepo);
        
        //act
        var exception = Record.Exception(() => sut.AddCategory(new Category()
        {
            Id = 0,
            Name = "Cat1",
            UserId = 1
        }));
        
        //assert
        exception.ShouldNotBeNull();
        exception.ShouldBeOfType<CategoryAlreadyExistsException>();
        categoryRepo.Categories.Count().ShouldBe(1);
    }
}