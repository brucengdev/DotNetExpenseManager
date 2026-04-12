using Backend.Core.Repository;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

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
        var result = _dbContext.Entries
            .Where(e => e.UserId == userId && e.Date.Date == date.Date)
            .Include(e => e.EntryTagMappings);
        return result;
    }

    public void DeleteEntry(int id)
    {
        var entry = _dbContext.Entries.Find(id);
        if (entry != null)
        {
            _dbContext.Entries.Remove(entry);
            _dbContext.SaveChanges();
        }
    }

    public bool Exists(int id)
    {
        return _dbContext.Entries.Find(id) != null;
    }

    public IEnumerable<Entry> GetEntries(DateOnly? fromDate, 
        DateOnly? toDate, 
        IEnumerable<int> categoryIds, 
        IEnumerable<int> tagIds,
        IEnumerable<int> payeeIds, 
        bool expenses,
        bool income,
        int userId)
    {
        DateTime? fromDate2 = fromDate.HasValue ? fromDate.Value.ToDateTime(new TimeOnly(0, 0, 0)) : null;
        DateTime? toDate2 = toDate.HasValue ? toDate.Value.ToDateTime(new TimeOnly(0, 0, 0)) : null;
        var result = _dbContext.Entries
            .Where(e => e.UserId == userId
                        && (
                            (fromDate2 == null || e.Date >= fromDate2)
                            && (toDate2 == null || e.Date <= toDate2)
                        )
                        && (
                            !categoryIds.Any() || categoryIds.Contains(e.CategoryId.Value)
                        )
                        && (
                            !tagIds.Any() ||
                            tagIds.Any(tagId => e.EntryTagMappings.Any(mapping => mapping.TagId == tagId))
                        )
                        && (
                            !payeeIds.Any() ||
                            payeeIds.Contains(e.PayeeId.Value)
                        )
                        && (
                            (expenses && e.Value < 0)
                            || (income && e.Value >= 0)
                        )
            ).Include(e => e.EntryTagMappings)
            .OrderByDescending(e => e.Date)//newest entries at the top
            .Take(1000);
        return result;
    }
}