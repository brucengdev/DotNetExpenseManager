using Backend.Models;

namespace Backend.Repository;

internal class EntryRepository: IEntryRepository
{
    private readonly ExpensesContext _dbContext;
    public EntryRepository(ExpensesContext context)
    {
        _dbContext = context;
    }

    public bool AddEntry(Entry entry)
    {
        _dbContext.Entries.Add(entry);
        _dbContext.SaveChanges();
        return true;
    }
}