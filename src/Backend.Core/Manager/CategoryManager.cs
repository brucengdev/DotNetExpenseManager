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
        return new List<Category>();
    }
}