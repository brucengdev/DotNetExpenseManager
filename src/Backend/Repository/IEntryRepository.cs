using Backend.Models;

namespace Backend.Repository;

internal interface IEntryRepository
{
    bool AddEntry(Entry entry);
    IEnumerable<Entry> GetByDateAndUser(DateTime date, int userId);
}