using Backend.Models;

namespace Backend.Core.Manager;

public class TagAlreadyExistsException : Exception
{
}

public interface ITagManager
{
    IEnumerable<Tag> GetTags(int userId);
    void AddTag(Tag tag);
}