using Backend.Models;

namespace Backend.Core.Models;

public class Payee
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }

    public string Name { get; set; }
    public Payee(NewPayee newPayee, int userId)
    {
        Name = newPayee.Name;
        UserId = userId;
    }
}