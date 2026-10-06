using Backend.Core.Repository;
using Backend.Models;
using Microsoft.AspNetCore.Builder;

namespace Backend.Core.Tests.Mocks;

public class TestUserRepository: IUserRepository
{
    private Dictionary<string, User> _users = new();
    public bool AddUser(User user)
    {
        return _users.TryAdd(user.Username, user);
    }

    public bool UpdateUser(User user)
    {
        if(!_users.TryGetValue(user.Username, out var existing))
        {
            return false;
        }

        existing.MakeSame(user);
        return true;
    }

    public User? GetUser(string username)
    {
        _users.TryGetValue(username, out var user);
        return user;
    }
    
    public User? GetUser(int userId)
    {
        var user = _users.Values.FirstOrDefault(u => u.Id == userId);
        return user;
    }

    public bool UserExists(string username)
        => _users.ContainsKey(username);

    public bool UserExists(int userId)
    {
        return _users.Values.Any(u => u.Id == userId);
    }
}