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
            })
            .OrderBy(cs => cs.Total)
            .ToList();
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

    public AverageIncomeReport GetAverageIncomeReport(int userId, DateOnly fromMonth, DateOnly toMonth)
    {
        var startDate = new DateTime(fromMonth.Year, fromMonth.Month, 1);
        var endDate = new DateTime(toMonth.Year, toMonth.Month, 1);
        endDate = endDate.AddMonths(1).AddDays(-1);//move to end of Month
        var income = _dbContext.Entries
            .Where(e => e.UserId == userId
                        && e.Date >= startDate
                        && e.Date <= endDate
                        && e.Value > 0)
            .GroupBy(e => new
            {
                Year = e.Date.Year,
                Month = e.Date.Month
            }).Select(g => new
            {
                Key = g.Key,
                Income = g.Sum(e => e.Value)
            }).Select(r => r.Income);

        var averageIncome = income.Any()? income.Average(): 0;

        return new()
        {
            FromMonth = fromMonth,
            ToMonth = toMonth,
            AverageIncome = averageIncome
        };
    }

    public YearlyReport GetYearlyReport(int userId, int year)
    {
        var months = _dbContext.Entries
            .Where(e => e.Date.Year == year)
            .GroupBy(e => e.Date.Month)
            .Select(g => new MonthSummary()
            {
                Month = g.Key,
                Spendings = g.Sum(e => e.Value < 0 ? e.Value : 0),
                Income = g.Sum(e => e.Value > 0 ? e.Value : 0),
                Savings = g.Sum(e => e.Value)
            })
            .OrderBy(ms => ms.Month);
        return new()
        {
            Months = months,
            Year = year,
            TotalSpendings = months.Sum(m => m.Spendings),
            TotalIncome = months.Sum(m => m.Income),
            TotalSavings = months.Sum(m => m.Savings)
        };
    }
}