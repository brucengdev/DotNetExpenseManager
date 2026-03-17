using Backend.Core.Models;

namespace Backend.WebApi.Models;

public class SpendingsReportServiceModel
{
    public float AmountSpentToday { get; set; }
    public float AmountSpentThisWeek { get; set; }
    public float AmountSpentThisMonth { get; set; }
    public float AmountSpentThisYear { get; set; }

    public static SpendingsReportServiceModel From(SpendingsReport report)
    {
        return new()
        {
            AmountSpentToday = report.AmountSpentToday,
            AmountSpentThisWeek = report.AmountSpentThisWeek,
            AmountSpentThisMonth = report.AmountSpentThisMonth,
            AmountSpentThisYear = report.AmountSpentThisYear
        };
    }
}