using Backend.Models;
using Backend.Repository;

namespace Backend.Tests.Mocks;

public class TestUserRepository: IUserRepository
{
    private Dictionary<string, User> _users = new();
    public bool AddUser(User user)
    {
        return _users.TryAdd(user.Username, user);
    }

    public User? GetUser(string username)
    {
        _users.TryGetValue(username, out var user);
        return user;
    }

    public bool UserExists(string username)
        => _users.ContainsKey(username);
}