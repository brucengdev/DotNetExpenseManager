using Backend.Core.Models;
using Backend.Core.Repository;

namespace Backend.Core.Manager;

public class ReportsManager: IReportsManager
{
    private IReportsRepository _reportsRepository;
    public ReportsManager(IReportsRepository reportsRepository)
    {
        _reportsRepository = reportsRepository;
    }
    public MonthlyReport GetMonthlyReport(int userId, DateTime month)
    {
        return _reportsRepository.GetMonthlyReport(userId, month);
    }

    public SpendingsReport GetSpendingsReport(int userId, DateTime date)
    {
        return _reportsRepository.GetSpendingsReport(userId, date);
    }

    public AverageIncomeReport GetAverageIncomeReport(int userId, DateOnly fromMonth, DateOnly toMonth)
    {
        return _reportsRepository.GetAverageIncomeReport(userId, fromMonth, toMonth);
    }

    public YearlyReport GetYearlyReport(int userId, int year)
    {
        return _reportsRepository.GetYearlyReport(userId, year);
    }
}