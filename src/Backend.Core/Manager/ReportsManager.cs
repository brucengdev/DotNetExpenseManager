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
        return GetMonthlyReport(userId, month);
    }
}