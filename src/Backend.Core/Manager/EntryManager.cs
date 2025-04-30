using Backend.Core.Repository;
using Backend.Models;
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
    public bool AddEntry(Entry input)
    {
        if (input.UserId <= 0)
        {
            throw new InvalidUserIdException();
        }
        return _entryRepository.AddEntry(input);
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