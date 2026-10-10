using Backend.Core.Models;

namespace Backend.Models;

public class YearlyByCatReport
{
    public List<CategorySummary> CategorySummaries { get; set; } = new();
    public float TotalSpendings { get; set; }
    public float TotalIncome { get; set; }
    public float Savings { get; set; }
}