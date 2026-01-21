using Backend.Core.Repository;
using Backend.Models;

namespace Backend.Core.Manager;

public class TagsManager: ITagsManager
{
    private readonly ITagsRepository _repository;
    public TagsManager(ITagsRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<Tag> GetTags(int userId)
    {
        return _repository.GetAllByUserId(userId);
    }

    public void AddTag(Tag tag)
    {
        if (_repository.Exists(tag.UserId, tag.Name))
        {
            throw new TagAlreadyExistsException();
        }
        _repository.AddTag(tag);
    }
}