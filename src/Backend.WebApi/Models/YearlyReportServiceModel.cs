using Backend.Core.Models;

namespace Backend.WebApi.Models;

public class YearlyReportServiceModel
{
    public int Year { get; set; }
    public IEnumerable<MonthSummaryServiceModel> Months { get; set; }

    public float TotalSpendings { get; set; }
    public float TotalIncome { get; set; }
    public float TotalSavings { get; set; }

    public static YearlyReportServiceModel From(YearlyReport domainModel)
    {
        return new()
        {
            Year = domainModel.Year,
            Months = domainModel.Months.Select(MonthSummaryServiceModel.From),
            TotalSpendings = domainModel.TotalSpendings,
            TotalIncome = domainModel.TotalIncome,
            TotalSavings = domainModel.TotalSavings,
        };
    }
}

public class MonthSummaryServiceModel
{
    public int Month { get; set; }
    public float Spendings { get; set; }
    public float Income { get; set; }
    public float Savings { get; set; }

    public static MonthSummaryServiceModel From(MonthSummary domainModel)
    {
        return new()
        {
            Month = domainModel.Month,
            Spendings = domainModel.Spendings,
            Income = domainModel.Income,
            Savings = domainModel.Savings,
        };
    }
}