using Backend.Core.Repository;
using Backend.Models;

namespace Backend.WebApi.Repository;

public class CategoryRepository: ICategoryRepository
{
    private readonly ExpensesContext _dbContext;
    public CategoryRepository(ExpensesContext context)
    {
        _dbContext = context;
    }

    public IEnumerable<Category> GetAllByUserId(int userId)
    {
        return _dbContext.Categories
            .Where(e => e.UserId == userId);
    }

    public void AddCategory(Category category)
    {
        _dbContext.Categories.Add(category);
        _dbContext.SaveChanges();
    }

    public bool Exists(int categoryUserId, string categoryName)
    {
        throw new NotImplementedException();
    }
}