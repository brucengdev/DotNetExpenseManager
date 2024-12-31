namespace Backend.Manager;

public enum CreateUserResult
{
    Success,
    AlreadyExists
}

public interface IAccountManager
{
    CreateUserResult CreateUser(string username, string password);

    string CreateAccessToken(string username, string password);
    
    bool IsTokenValid(string token);
}