using Backend.Models;
using Backend.WebApi.Models;

namespace Backend.Core.Manager;

public interface IEntryManager
{
    bool AddEntry(EntryServiceModel input);

    IEnumerable<Entry> GetByDate(DateTime date, int userId);

    void DeleteEntry(int entryId);
}