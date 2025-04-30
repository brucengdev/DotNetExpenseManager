using Backend.Core.Repository;
using Backend.Models;

namespace Backend.Core.Tests.Mocks;

public class TestEntryRepository: IEntryRepository
{
    public List<Entry> Entries { get; set; } = new();
    public bool AddEntry(Entry entry)
    {
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