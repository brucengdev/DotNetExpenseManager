using Backend.Models;
using Backend.WebApi.Models;

namespace Backend.Core.Manager;

public interface IEntryManager
{
    bool AddEntry(EntryServiceModel input);

    IEnumerable<Entry> GetByDate(DateTime date, int userId);

    void DeleteEntry(int entryId);
    IEnumerable<Entry> GetEntries(DateOnly? fromDate, 
        DateOnly? toDate, 
        IEnumerable<int> categoryIds, 
        IEnumerable<int> tagIds, 
        IEnumerable<int> payeeIds,
        int userId);
}