using Backend.Core.Models;
using Backend.Core.Repository;
using Backend.Models;

namespace Backend.WebApi.Repository;

public class ReportsRepository: IReportsRepository
{
    private ExpensesContext _dbContext;

    public ReportsRepository(ExpensesContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public MonthlyReport GetMonthlyReport(int userId, DateTime month)
    {
        var categorySummaries = _dbContext.Entries
            .Where(e => e.Date.Month == month.Month && e.Date.Year == month.Year && e.UserId == userId)
            .GroupBy(e => e.CategoryId)
            .Where(g => g.Key.HasValue)
            .Select(g => new CategorySummary
            {
                CategoryId = g.Key!.Value,
                CategoryName = g.First().Category.Name,
                Total = g.Sum(e => e.Value)
            }).ToList();
        var spendings = categorySummaries.Where(s => s.Total < 0).Sum(s => s.Total);
        var income = categorySummaries.Where(s => s.Total > 0).Sum(s => s.Total);
        return new MonthlyReport()
        {
            CategorySummaries = categorySummaries,
            TotalSpendings = spendings,
            TotalIncome = income,
            Savings = income + spendings
        };
    }

    public SpendingsReport GetSpendingsReport(int userId, DateTime date)
    {
        var amountSpentToday = _dbContext.Entries
            .Where(e => e.UserId == userId && e.Date.Date == date.Date && e.Value < 0)
            .Select(e => e.Value)
            .Sum();
        var amountSpentThisMonth = _dbContext.Entries
            .Where(e => e.UserId == userId && e.Date.Month == date.Month && e.Date.Year == date.Year && e.Value < 0)
            .Select(e => e.Value)
            .Sum();
        var amountSpentThisYear = _dbContext.Entries
            .Where(e => e.UserId == userId && e.Date.Year == date.Year && e.Value < 0)
            .Select(e => e.Value)
            .Sum();
        
        var daysSinceMonday = date.DayOfWeek == DayOfWeek.Sunday ? 6 : ((int)date.DayOfWeek - 1);
        var monday = date.Date.AddDays(-daysSinceMonday);
        var sunday = monday.AddDays(6);
        var amountSpentThisWeek = _dbContext.Entries
            .Where(e => e.UserId == userId && e.Date >= monday && e.Date <= sunday && e.Value < 0)
            .Select(e => e.Value)
            .Sum();
        return new()
        {
            AmountSpentToday = amountSpentToday,
            AmountSpentThisWeek = amountSpentThisWeek,
            AmountSpentThisMonth = amountSpentThisMonth,
            AmountSpentThisYear = amountSpentThisYear
        };
    }
}