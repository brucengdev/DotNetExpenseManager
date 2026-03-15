using Backend.Core.Models;

namespace Backend.Core.Repository;

public interface IReportsRepository
{
    MonthlyReport GetMonthlyReport(int userId, DateTime month);
}