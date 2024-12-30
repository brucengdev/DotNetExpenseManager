using Microsoft.AspNetCore.Mvc;

namespace Backend.Manager;

public interface IAccountManager
{
    bool VerifyUser(string username, string password);
    bool CreateUser(string username, string password);
}