using Backend.Models;

namespace Backend.Core.Repository;

public interface IUserRepository
{
    User? GetUser(string username);
    
    User? GetUser(int userId);

    bool AddUser(User user);

    bool UserExists(string username);
}