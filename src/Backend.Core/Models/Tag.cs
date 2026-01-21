namespace Backend.Models;

public class Tag
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int UserId { get; set; }

    public override bool Equals(object? other)
    {
        if (other is not Tag otherTag)
        {
            return false;
        }
        return Id == otherTag.Id 
               && Name == otherTag.Name 
               && UserId == otherTag.UserId;
    }
}