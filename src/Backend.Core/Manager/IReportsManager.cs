using Backend.Core.Models;

namespace Backend.Core.Manager;

public interface IReportsManager
{
    MonthlyReport GetMonthlyReport(int userId, DateTime month);
}