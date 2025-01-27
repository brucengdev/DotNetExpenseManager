using Backend.Core.Repository;
using Backend.Models;

namespace Backend.Core.Tests.Mocks;

public class TestCategoryRepository: ICategoryRepository
{
    public List<Category> Categories = new();
}