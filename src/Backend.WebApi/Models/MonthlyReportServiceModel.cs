using Backend.Core.Models;

namespace Backend.WebApi.Models;

public class MonthlyReportServiceModel
{
    public static MonthlyReportServiceModel From(MonthlyReport monthlyReport)
    {
        throw new NotImplementedException();
    }

    public Dictionary<string, float> ByCategories { get; set; } = new();

    public float TotalIncome { get; set; }
    public float TotalSpendings { get; set; }
    public float TotalExpenses { get; set; }
}