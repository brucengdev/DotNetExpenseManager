using Backend.Models;

namespace Backend.WebApi.Models;

public class EntryServiceModel: EntryPlain
{
    public EntryServiceModel() : base()
    {
    }

    public EntryServiceModel(EntryServiceModel other) : base(other)
    {
        TagIds = new List<int>(other.TagIds);
    }
    
    
    public EntryServiceModel(Entry other) : base(other)
    {
        TagIds = other.EntryTagMappings?.Select(m => m.TagId).ToList();
    }
    public IList<int> TagIds { get; set;  }

    public override bool Equals(object? obj)
    {
        if (obj is not EntryServiceModel other)
        {
            return false;
        }

        var bothTagIdsNull = TagIds == null && other.TagIds == null;
        var sameTagIds = bothTagIdsNull;
        if (!bothTagIdsNull)
        {
            sameTagIds = TagIds != null && other.TagIds != null && TagIds.SequenceEqual(other.TagIds);
        }
        return base.Equals(obj) && sameTagIds;
    }
}