using Backend.Core.Manager;
using Backend.Models;

namespace Backend.WebApi.Tests.Mocks;

public class TestTagsManager: ITagsManager
{
    public List<Tag> Tags { get; set; } = new();

    public IEnumerable<Tag> GetTags(int userId)
    {
        return Tags.Where(c => c.UserId == userId).ToList();
    }

    public void AddTag(Tag tag)
    {
        tag.Id = Tags
                        .Select(c => c.Id)
                        .Concat(new List<int>(){ 0 }).Max() + 1;
        Tags.Add(tag);
    }
}