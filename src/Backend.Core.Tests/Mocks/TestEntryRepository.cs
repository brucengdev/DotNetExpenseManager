using Backend.Core.Models;
using Backend.Core.Repository;
using Backend.Models;

namespace Backend.Core.Tests.Mocks;

public class TestEntryRepository: IEntryRepository
{
    public List<Entry> Entries { get; set; } = new();
    public List<EntryTagMapping> EntryTagMappings { get; set; } = new();
    public bool AddEntry(Entry entry)
    {
        entry.Id = Entries.Count + 1;
        foreach (var tagMapping in entry.EntryTagMappings)
        {
            tagMapping.Id = EntryTagMappings.Count + 1;
            tagMapping.EntryId = entry.Id;
            EntryTagMappings.Add(tagMapping);
        }
        Entries.Add(entry);
        return true;
    }

    public IEnumerable<Entry> GetByDateAndUser(DateTime date, int userId)
    {
        return Entries.Where(e => e.UserId == userId & e.Date.Date == date.Date);
    }

    public void DeleteEntry(int id)
    {
        var entry = Entries.First(e  => e.Id == id);
        Entries.Remove(entry);
    }

    public bool Exists(int id)
    {
        return Entries.Exists(e => e.Id == id);
    }
}