using Backend.Models;

namespace Backend.Core.Repository;

public interface ITagsRepository
{
    IEnumerable<Tag> GetAllByUserId(int userId);
    void AddTag(Tag tag);
    bool Exists(int userId, string name);
}