using Backend.Models;

namespace Backend.Core.Repository;

public interface IUserRepository
{
    User? GetUser(string username);
    
    User? GetUser(int userId);

    bool AddUser(User user);

    bool UpdateUser(User user);

    bool UserExists(string username);

    bool UserExists(int userId);
}