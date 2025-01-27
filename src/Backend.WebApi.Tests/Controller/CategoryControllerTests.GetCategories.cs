using Backend.Core.Manager;
using Backend.WebApi.Controllers;
using Moq;

namespace Backend.WebApi.Tests.Controller;

public partial class CategoryControllerTests
{
    [Fact]
    public void GetCategories_must_return_categories_for_user()
    {
        //arrange
        var accountManager = new Mock<IAccountManager>();
        var sut = new CategoryController(accountManager.Object);
    }
}