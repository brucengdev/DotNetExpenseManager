using Backend.Core.Repository;
using Backend.Models;

namespace Backend.WebApi.Repository;

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

    public IEnumerable<Entry> GetByDateAndUser(DateTime date, int userId)
    {
        return _dbContext.Entries
            .Where(e => e.UserId == userId && e.Date.Date == date.Date);
    }
}