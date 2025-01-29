using Backend.Models;

namespace Backend.Core.Repository;

public interface ICategoryRepository
{
    IEnumerable<Category> GetAllByUserId(int userId);
    void AddCategory(Category category);
    bool Exists(int userId, string name);
}