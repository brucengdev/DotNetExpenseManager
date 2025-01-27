using Backend.Core.Manager;
using Backend.Core.Tests.Mocks;
using Moq;

namespace Backend.Core.Tests;

public class CategoryManagerTests
{
    [Fact]
    public void GetCategories_must_return()
    {
        //arrange
        var categoryRepo = new TestCategoryRepository();
        var sut = new CategoryManager(categoryRepo);
    }
}