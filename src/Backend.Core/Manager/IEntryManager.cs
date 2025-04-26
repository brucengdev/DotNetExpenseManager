using Backend.Models;

namespace Backend.Core.Manager;

public interface IEntryManager
{
    bool AddEntry(Entry input);

    IEnumerable<Entry> GetByDate(DateTime date, int userId);

    void DeleteEntry(int entryId);
}