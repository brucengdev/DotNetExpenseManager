using Backend.Models;

namespace Backend.Core.Repository;

public interface IEntryRepository
{
    bool AddEntry(Entry entry);
    IEnumerable<Entry> GetByDateAndUser(DateTime date, int userId);

    void DeleteEntry(int id);

    bool Exists(int id);
    IEnumerable<Entry> GetEntries(DateOnly? fromDate, 
        DateOnly? toDate, 
        IEnumerable<int> categoryIds,
        IEnumerable<int> tagIds,
        IEnumerable<int> payeeIds,
        bool expenses,
        bool income,
        int userId);
}