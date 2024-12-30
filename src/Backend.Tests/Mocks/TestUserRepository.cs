using Backend.Models;
using Backend.Repository;

namespace Backend.Tests.Mocks;

public class TestUserRepository: IUserRepository
{
    private Dictionary<string, User> _users = new();
    public bool AddUser(User user)
    {
        _users.Add(user.Username, user);
        return true;
    }

    public User? GetUser(string username)
    {
        _users.TryGetValue(username, out var user);
        return user;
    }
}