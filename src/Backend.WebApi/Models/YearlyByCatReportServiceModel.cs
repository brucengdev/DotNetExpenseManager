using Backend.Core.Models;
using Backend.Models;

namespace Backend.WebApi.Models;

public class YearlyByCatReportServiceModel
{
    public static YearlyByCatReportServiceModel From(YearlyByCatReport yearlyByCatReport)
    {
        return new YearlyByCatReportServiceModel()
        {
            ByCategories = yearlyByCatReport.CategorySummaries.ToDictionary(
                s => s.CategoryName, 
                s => new CategorySummaryServiceModel()
                {
                    TotalExpenses = s.TotalExpenses,
                    TotalIncome = s.TotalIncome,
                    ExpensePercentage = s.ExpensePercentage
                }),
            TotalSpendings = yearlyByCatReport.TotalSpendings,
            TotalIncome = yearlyByCatReport.TotalIncome,
            Savings = yearlyByCatReport.Savings
        };
    }

    public Dictionary<string, CategorySummaryServiceModel> ByCategories { get; set; } = new();

    public float TotalIncome { get; set; }
    public float TotalSpendings { get; set; }
    public float Savings { get; set; }
}