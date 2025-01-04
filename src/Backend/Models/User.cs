using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    
    public ICollection<Entry> Entries { get; set; }

    public override bool Equals(object? obj)
    {
        return obj is User otherUser
            && Id == otherUser.Id
            && Username == otherUser.Username
            && Password == otherUser.Password;
    }
}