using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string PasswordHash { get; set; }

    public override bool Equals(object? obj)
    {
        return obj is User otherUser
               && Id == otherUser.Id
               && Username == otherUser.Username
               && PasswordHash == otherUser.PasswordHash;
    }

    public void MakeSame(User other)
    {
        Id = other.Id;
        Username = other.Username;
        PasswordHash = other.PasswordHash;
    }
}