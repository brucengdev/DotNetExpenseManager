using Backend.Models;
using Backend.Repository;

namespace Backend.Tests.Mocks;

public class TestEntryRepository: IEntryRepository
{
    public List<Entry> Entries { get; set; } = new();
    public bool AddEntry(Entry entry)
    {
        Entries.Add(entry);
        return true;
    }
}