namespace Backend.Core.Models;

public class CategorySummary
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
    public float Total { get; set; }
}
public class MonthlyReport
{
    public List<CategorySummary> CategorySummaries { get; set; }
    public float TotalSpendings { get; set; }
    public float TotalIncome { get; set; }
    public float Savings { get; set; }
}