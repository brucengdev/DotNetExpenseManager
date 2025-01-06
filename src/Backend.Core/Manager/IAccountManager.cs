using Backend.Models;

namespace Backend.Core.Manager;

public enum CreateUserResult
{
    Success,
    AlreadyExists
}

public interface IAccountManager
{
    CreateUserResult CreateUser(string username, string password);

    string CreateAccessToken(string username, string password, DateTime creationTime);

    bool IsTokenValid(string token, DateTime currentTime);
    int GetUserId(string accessToken, DateTime currentTime);

    User GetById(int userId);
}