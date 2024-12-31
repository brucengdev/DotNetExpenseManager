using Backend.Models;
using Backend.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Manager;

internal class UserNotFoundException : Exception
{
    
}

internal class WrongPasswordException : Exception
{
    
}

internal class AccountManager: IAccountManager
{
    internal IUserRepository _userRepository;

    public AccountManager(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    private bool VerifyUser(string username, string password)
    {
        var user = _userRepository.GetUser(username);
        if (user == null)
        {
            throw new UserNotFoundException();
        }

        if (user.Password != password)
        {
            throw new WrongPasswordException();
        }

        return true;
    }

    public CreateUserResult CreateUser(string username, string password)
    {
        if (_userRepository.UserExists(username))
        {
            return CreateUserResult.AlreadyExists;
        }
        _userRepository.AddUser(new User()
        {
            Username = username,
            Password = password
        });
        return CreateUserResult.Success;
    }

    public string CreateAccessToken(string username, string password, DateTime creationTime)
    {
        VerifyUser(username, password);
        var expiryTime = creationTime.AddHours(1);
        return $"{username}-{expiryTime.ToString("yyyy-MM-dd-HH-mm")}";
    }

    public bool IsTokenValid(string token, DateTime currentTime)
    {
        return true;
    }
}