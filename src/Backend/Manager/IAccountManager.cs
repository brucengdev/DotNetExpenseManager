namespace Backend.Manager;

public enum CreateUserResult
{
    Success,
    AlreadyExists
}

public interface IAccountManager
{
    bool VerifyUser(string username, string password);
    CreateUserResult CreateUser(string username, string password);
}