using Backend.Models;

namespace Backend.Core.Manager;

public class TagAlreadyExistsException : Exception
{
}

public interface ITagsManager
{
    IEnumerable<Tag> GetTags(int userId);
    void AddTag(Tag tag);
}