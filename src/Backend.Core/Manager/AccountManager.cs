using System.Security.Cryptography;
using System.Text;
using Backend.Core.Repository;
using Backend.Models;

namespace Backend.Core.Manager;

public class UserNotFoundException : Exception
{
    
}

public class WrongPasswordException : Exception
{
    
}

public class MalformedTokenException : Exception
{
    
}

public class TokenExpiredException : Exception
{
    
}

public class AccountManager: IAccountManager
{
    internal IUserRepository _userRepository;
    private readonly string _salt;
    private readonly int _hoursTillExpiration;

    public AccountManager(IUserRepository userRepository, string salt, int hoursTillExpiration = 1)
    {
        _salt = salt;
        _userRepository = userRepository;
        _hoursTillExpiration = hoursTillExpiration;
    }
    private bool VerifyUser(string username, string password)
    {
        var user = _userRepository.GetUser(username);
        if (user == null)
        {
            throw new UserNotFoundException();
        }

        if (CreateHash(password, _salt) != user.PasswordHash)
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
            PasswordHash = CreateHash(password, _salt)
        });
        return CreateUserResult.Success;
    }

    public string CreateAccessToken(string username, string password, DateTime creationTime)
    {
        VerifyUser(username, password);
        var user = _userRepository.GetUser(username);
        var expiryTime = creationTime.AddHours(_hoursTillExpiration);
        var info = $"{username}-{expiryTime.ToString("yyyy-MM-dd-HH-mm")}";
        var infoAndPasswordHash = info + user.PasswordHash;
        var hasedInfoAndPassHash = CreateHash(infoAndPasswordHash, _salt);
        return $"{info}-{hasedInfoAndPassHash}";
    }

    public static string CreateHash(string input, string salt)
    {
        using var algo = SHA256.Create();
        var phraseToHash = input + salt;
        var hash = algo.ComputeHash(Encoding.UTF8.GetBytes(phraseToHash));
        return Convert.ToBase64String(hash);
    }


    public bool IsTokenValid(string token, DateTime currentTime)
    {
        try
        {
            GetUserId(token, currentTime);
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    public int GetUserId(string accessToken, DateTime currentTime)
    {
        var username = "";
        var info = "";
        var hash = "";
        DateTime expiry;
        try
        {
            var parts = accessToken.Split('-');
            username = parts[0];
            expiry = new DateTime(Convert.ToInt32(parts[1]),
                Convert.ToInt32(parts[2]),
                Convert.ToInt32(parts[3]),
                Convert.ToInt32(parts[4]),
                Convert.ToInt32(parts[5]),
                0);
            
            info = accessToken.Substring(0, accessToken.LastIndexOf('-'));
        }
        catch (Exception)
        {
            throw new MalformedTokenException();
        }

        var user = _userRepository.GetUser(username);
        if (user == null)
        {
            throw new UserNotFoundException();
        }

        var recreatedToken = info + "-" + CreateHash(info + user.PasswordHash, _salt);
        if (recreatedToken != accessToken)
        {
            throw new MalformedTokenException();
        }
        
        if (currentTime > expiry)
        {
            throw new TokenExpiredException();
        }
        
        return user.Id;
    }

    public User GetById(int userId)
    {
        return _userRepository.GetUser(userId);
    }
}