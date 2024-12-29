namespace Backend.Manager;

public interface IAccountManager
{
    bool VerifyUser(string username, string password);
}