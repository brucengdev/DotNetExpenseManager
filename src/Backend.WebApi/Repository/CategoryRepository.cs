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
}