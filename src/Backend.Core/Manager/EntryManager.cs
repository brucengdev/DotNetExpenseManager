using Backend.Core.Repository;
using Backend.Models;
using Backend.WebApi.Models;

namespace Backend.Core.Manager;

public class InvalidUserIdException : Exception { }

public class EntryNotFoundException: Exception { }

public class EntryManager: IEntryManager
{
    private readonly IEntryRepository _entryRepository;
    public EntryManager(IEntryRepository entryRepo)
    {
        _entryRepository = entryRepo;
    }
    public bool AddEntry(EntryServiceModel input)
    {
        if (input.UserId <= 0)
        {
            throw new InvalidUserIdException();
        }

        var entry = new Entry(input);
        return _entryRepository.AddEntry(entry);
    }

    public IEnumerable<Entry> GetByDate(DateTime date, int userId)
    {
        return _entryRepository.GetByDateAndUser(date, userId);
    }

    public void DeleteEntry(int entryId)
    {
        if (!_entryRepository.Exists(entryId))
        {
            throw new EntryNotFoundException();
        }
        _entryRepository.DeleteEntry(entryId);
    }
}