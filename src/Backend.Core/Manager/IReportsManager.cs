using Backend.Core.Models;
using Backend.Models;

namespace Backend.Core.Manager;

public interface IReportsManager
{
    MonthlyReport GetMonthlyReport(int userId, DateTime month);
    SpendingsReport GetSpendingsReport(int userId, DateTime date);

    AverageIncomeReport GetAverageIncomeReport(int userId, DateOnly fromMonth, DateOnly toMonth);
    YearlyReport GetYearlyReport(int userId, int year);
    YearlyByCatReport GetYearlyByCatReport(int userId, int year);
}