using Backend.Models;

namespace Backend.Repository;

public interface IUserRepository
{
    User? GetUser(string username);
}