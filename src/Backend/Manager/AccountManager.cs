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

internal class TokenExpiredException : Exception
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
        try
        {
            var parts = token.Split('-');
            var username = parts[0];
            if (!_userRepository.UserExists(username))
            {
                return false;
            }

            var expiry = new DateTime(Convert.ToInt32(parts[1]),
                Convert.ToInt32(parts[2]),
                Convert.ToInt32(parts[3]),
                Convert.ToInt32(parts[4]),
                Convert.ToInt32(parts[5]),
                0);
            if (currentTime > expiry)
            {
                return false;
            }

            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    public int GetUserId(string accessToken)
    {
        var username = accessToken.Substring(0, accessToken.IndexOf('-'));
        var user = _userRepository.GetUser(username);
        if (user == null)
        {
            throw new UserNotFoundException();
        }
        return user.Id;
    }
}