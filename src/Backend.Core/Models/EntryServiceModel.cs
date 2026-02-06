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
    public IList<int> TagIds { get; set;  }
}