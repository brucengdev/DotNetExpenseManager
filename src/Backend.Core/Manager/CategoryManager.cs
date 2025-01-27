using Backend.Core.Repository;
using Backend.Models;

namespace Backend.Core.Manager;

public class CategoryManager
{
    public CategoryManager(ICategoryRepository repository)
    {
    }

    public IEnumerable<Category> GetCategories(int i)
    {
        return new List<Category>()
        {
            new() { Id = 1, Name = "household", UserId = 1 },
            new() { Id = 2, Name = "Leisure", UserId = 1 },
        };
    }
}