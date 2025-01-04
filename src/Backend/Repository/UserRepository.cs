using System.Data.Common;
using Backend.Models;

namespace Backend.Repository;

internal class UserRepository: IUserRepository
{
    private readonly ExpensesContext _dbContext;
    public UserRepository(ExpensesContext context)
    {
        _dbContext = context;
    }
    public User? GetUser(string username)
    {
        return _dbContext.Users
            .FirstOrDefault(u => u.Username == username);
    }
    
    public User? GetUser(int userId)
    {
        return _dbContext.Users
            .FirstOrDefault(u => u.Id == userId);
    }

    public bool AddUser(User user)
    {
        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();
        return true;
    }

    public bool UserExists(string username)
    {
        return _dbContext.Users.Any(u => u.Username == username);
    }
}