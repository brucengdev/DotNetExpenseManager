using Backend.Models;

namespace Backend.Core.Manager;

public interface ICategoryManager
{
    IEnumerable<Category> GetCategories(int userId);
    void AddCategory(Category category);
}