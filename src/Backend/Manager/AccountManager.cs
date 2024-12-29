using Microsoft.AspNetCore.Mvc;

namespace Backend.Manager;

public class AccountManager: IAccountManager
{
    public bool VerifyUser(string username, string password)
    {
        return true;
    }
}