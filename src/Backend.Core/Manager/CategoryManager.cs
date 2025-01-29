using Backend.Core.Repository;
using Backend.Models;

namespace Backend.Core.Manager;

public class CategoryManager: ICategoryManager
{
    private readonly ICategoryRepository _repository;
    public CategoryManager(ICategoryRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<Category> GetCategories(int userId)
    {
        return _repository.GetAllByUserId(userId);
    }

    public void AddCategory(Category category)
    {
        _repository.AddCategory(category);
    }
}