using Backend.Core.Repository;
using Backend.Models;

namespace Backend.Core.Tests.Mocks;

public class TestTagsRepository: ITagsRepository
{
    public List<Tag> Tags = new();
    public IEnumerable<Tag> GetAllByUserId(int userId)
    {
        return Tags.Where(c => c.UserId == userId).ToList();
    }

    public void AddTag(Tag tag)
    {
        tag.Id = Tags.Select(c => c.Id)
            .Concat(new List<int> { 0 })
            .Max() + 1;
        Tags.Add(tag);
    }

    public bool Exists(int userId, string name)
    {
        return Tags.Any(c => c.UserId == userId && c.Name == name);
    }
}