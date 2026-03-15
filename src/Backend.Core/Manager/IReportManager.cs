using Backend.Core.Models;

namespace Backend.Core.Manager;

public interface IReportManager
{
    MonthlyReport GetMonthlyReport(int userId, DateTime month);
}