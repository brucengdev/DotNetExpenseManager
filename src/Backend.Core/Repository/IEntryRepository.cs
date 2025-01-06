using Backend.Models;

namespace Backend.Core.Repository;

public interface IEntryRepository
{
    bool AddEntry(Entry entry);
    IEnumerable<Entry> GetByDateAndUser(DateTime date, int userId);
}