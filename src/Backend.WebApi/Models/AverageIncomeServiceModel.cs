using Backend.Core.Models;

namespace Backend.WebApi.Models;

public class AverageIncomeServiceModel
{
    public DateOnly FromMonth { get; set; }
    public DateOnly ToMonth { get; set; }
    public float AverageIncome { get; set; }

    public static AverageIncomeServiceModel From(AverageIncomeReport report)
    {
        return new()
        {
            FromMonth = report.FromMonth,
            ToMonth = report.ToMonth,
            AverageIncome = report.AverageIncome
        };
    }
}