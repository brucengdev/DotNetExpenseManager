using Backend.Core.Models;

namespace Backend.WebApi.Models;

public class MonthlyReportServiceModel
{
    public static MonthlyReportServiceModel From(MonthlyReport monthlyReport)
    {
        return new MonthlyReportServiceModel()
        {
            ByCategories = monthlyReport.CategorySummaries.ToDictionary(
                s => s.CategoryName, 
                s => new CategorySummaryServiceModel()
                {
                    Total = s.Total,
                    ExpensePercentage = s.ExpensePercentage
                }),
            TotalSpendings = monthlyReport.TotalSpendings,
            TotalIncome = monthlyReport.TotalIncome,
            Savings = monthlyReport.Savings
        };
    }

    public Dictionary<string, CategorySummaryServiceModel> ByCategories { get; set; } = new();

    public float TotalIncome { get; set; }
    public float TotalSpendings { get; set; }
    public float Savings { get; set; }
}

public class CategorySummaryServiceModel
{ 
    public float Total { get; set; }
    public float ExpensePercentage { get; set; }
}