using Backend.Core.Repository;
using Backend.Models;

namespace Backend.WebApi.Repository;

public class TagsRepository: ITagsRepository
{
    private readonly ExpensesContext _dbContext;
    public TagsRepository(ExpensesContext context)
    {
        _dbContext = context;
    }

    public IEnumerable<Tag> GetAllByUserId(int userId)
    {
        return _dbContext.Tags
            .Where(e => e.UserId == userId);
    }

    public void AddTag(Tag tag)
    {
        _dbContext.Tags.Add(tag);
        _dbContext.SaveChanges();
    }

    public bool Exists(int userId, string name)
    {
        return _dbContext.Tags
            .Any(c => c.UserId == userId && c.Name == name);
    }
}