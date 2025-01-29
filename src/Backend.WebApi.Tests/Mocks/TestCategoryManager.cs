using Backend.Core.Manager;
using Backend.Models;

namespace Backend.WebApi.Tests.Mocks;

public class TestCategoryManager: ICategoryManager
{
    public List<Category> Categories { get; set; } = new();

    public IEnumerable<Category> GetCategories(int userId)
    {
        return Categories.Where(c => c.UserId == userId).ToList();
    }

    public void AddCategory(Category category)
    {
        category.Id = Categories
                        .Select(c => c.Id)
                        .Concat(new List<int>(){ 0 }).Max() + 1;
        Categories.Add(category);
    }
}