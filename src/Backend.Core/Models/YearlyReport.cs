namespace Backend.Core.Models;

public class YearlyReport
{
    public int Year { get; set; }
    public IEnumerable<MonthSummary> Months { get; set; }

    public float TotalSpendings { get; set; }
    public float TotalIncome { get; set; }
    public float TotalSavings { get; set; }
}

public class MonthSummary
{
    public int Month { get; set; }
    public float Spendings { get; set; }
    public float Income { get; set; }
    public float Savings { get; set; }
}