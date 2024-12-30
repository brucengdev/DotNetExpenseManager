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
        var user = _userRepository.GetUser(username);
        return user!=null && user.Password == password;
    }

    public bool CreateUser(string username, string password)
    {
        return true;
    }
}