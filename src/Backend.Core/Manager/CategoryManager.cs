using Backend.Core.Repository;
using Backend.Models;

namespace Backend.Core.Manager;

public class CategoryManager
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
}