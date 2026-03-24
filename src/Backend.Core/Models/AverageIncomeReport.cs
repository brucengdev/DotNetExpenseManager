namespace Backend.Core.Models;

public class AverageIncomeReport
{
    public DateOnly FromMonth { get; set; }
    public DateOnly ToMonth { get; set; }
    public float AverageIncome { get; set; }
}