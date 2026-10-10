using Backend.Core.Models;
using Backend.Models;

namespace Backend.Core.Repository;

public interface IReportsRepository
{
    MonthlyReport GetMonthlyReport(int userId, DateTime month);
    SpendingsReport GetSpendingsReport(int userId, DateTime date);
    AverageIncomeReport GetAverageIncomeReport(int userId, DateOnly fromMonth, DateOnly toMonth);
    YearlyByMonthReport GetYearlyByMonthReport(int userId, int year);
    YearlyByCatReport GetYearlyByCatReport(int userId, int year);
}