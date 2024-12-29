using Backend.Models;
using Backend.Repository;

namespace Backend.Tests.Mocks;

public class TestUserRepository: IUserRepository
{
    private Dictionary<string, User> _users = new();
    public void CreateUser(User user)
    {
        _users.Add(user.Username, user);
    }

    public User GetUser(string username)
    {
        return _users[username];
    }
}