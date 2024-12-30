using Backend.Models;

namespace Backend.Repository;

public interface IUserRepository
{
    User? GetUser(string username);

    bool AddUser(User user);

    bool UserExists(string username);
}