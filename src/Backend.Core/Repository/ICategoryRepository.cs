using Backend.Models;

namespace Backend.Core.Repository;

public interface ICategoryRepository
{
    IEnumerable<Category> GetAllByUserId(int userId);
}