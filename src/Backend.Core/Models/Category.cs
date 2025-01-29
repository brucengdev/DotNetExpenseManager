namespace Backend.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int UserId { get; set; }

    public override bool Equals(object? other)
    {
        if (other is not Category otherCat)
        {
            return false;
        }
        return Id == otherCat.Id 
               && Name == otherCat.Name 
               && UserId == otherCat.UserId;
    }
}