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

    public void AddCategory(Category category)
    {
        category.Id = Categories.Select(c => c.Id)
            .Concat(new List<int> { 0 })
            .Max() + 1;
        Categories.Add(category);
    }

    public bool Exists(int userId, string name)
    {
        return Categories.Any(c => c.UserId == userId && c.Name == name);
    }
}