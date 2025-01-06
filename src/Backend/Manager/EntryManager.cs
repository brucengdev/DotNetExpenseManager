using Backend.Models;
using Backend.Repository;

namespace Backend.Manager;

internal class InvalidUserIdException : Exception
{
    
}

internal class EntryManager: IEntryManager
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
}