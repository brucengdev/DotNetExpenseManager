using Backend.Core.Repository;
using Backend.Models;

namespace Backend.Core.Tests.Mocks;

public class TestCategoryRepository: ICategoryRepository
{
    public List<Category> Categories = new();
    public IEnumerable<Category> GetAllByUserId(int userId)
    {
        return Categories.Where(c => c.UserId == userId).ToList();
    }
}