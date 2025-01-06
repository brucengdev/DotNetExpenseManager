using Backend.Models;

namespace Backend.Manager;

public interface IEntryManager
{
    bool AddEntry(Entry input);

    IEnumerable<EntryPlain> GetByDate(DateTime date);
}