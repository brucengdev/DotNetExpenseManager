using Backend.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Manager;

public class AccountManager: IAccountManager
{
    internal IUserRepository _userRepository;

    public AccountManager(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    public bool VerifyUser(string username, string password)
    {
        if(username == "johndoe" && password == "testpassword")
            return true;
        return false;
    }
}