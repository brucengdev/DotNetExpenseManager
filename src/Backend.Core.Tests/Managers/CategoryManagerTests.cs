using Backend.Core.Manager;
using Backend.Core.Repository;
using Moq;

namespace Backend.Core.Tests;

public class CategoryManagerTests
{
    [Fact]
    public void GetCategories_must_return()
    {
        //arrange
        var categoryRepo = new Mock<ICategoryRepository>();
        var sut = new CategoryManager(categoryRepo.Object);
    }
}