using Backend.Models;
using Backend.Repository;

namespace Backend.Manager;

internal class EntryManager: IEntryManager
{
    private readonly IEntryRepository _entryRepository;
    internal EntryManager(IEntryRepository entryRepo)
    {
        _entryRepository = entryRepo;
    }
    public bool AddEntry(Entry input)
    {
        return _entryRepository.AddEntry(input);
    }
}