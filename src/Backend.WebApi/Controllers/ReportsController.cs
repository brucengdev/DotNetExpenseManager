using Backend.Core.Manager;
using Backend.WebApi.ActionFilters;
using Backend.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ReportsController: ControllerBase
{
    private readonly IReportsManager _reportsManager;

    public ReportsController(IReportsManager reportsManager)
    {
        _reportsManager = reportsManager;
    }
    
    [HttpGet("monthly/{month}")]
    [ServiceFilter<SecurityFilterAttribute>]
    public MonthlyReportServiceModel GetMonthlyReport(DateTime month)
    {
        var userId = HttpContext.Items[Constants.USER_ID] as int?;
        return MonthlyReportServiceModel.From(_reportsManager.GetMonthlyReport(userId.Value!, month));
    }
    
    [HttpGet("spendings/{date}")]
    [ServiceFilter<SecurityFilterAttribute>]
    public SpendingsReportServiceModel GetSpendings(DateTime date)
    {
        var userId = HttpContext.Items[Constants.USER_ID] as int?;
        return SpendingsReportServiceModel.From(_reportsManager.GetSpendingsReport(userId.Value!, date));
    }
    
    
    [HttpGet("averageIncome")]
    [ServiceFilter<SecurityFilterAttribute>]
    public AverageIncomeServiceModel GetAverageIncome(
        [FromQuery] DateOnly fromMonth,
        [FromQuery] DateOnly toMonth
        )
    {
        var userId = HttpContext.Items[Constants.USER_ID] as int?;
        return AverageIncomeServiceModel.From(
            _reportsManager.GetAverageIncomeReport(userId.Value!, fromMonth, toMonth));
    }
    
    
    [HttpGet("yearlybymonth/{year}")]
    [ServiceFilter<SecurityFilterAttribute>]
    public YearlyByMonthReportServiceModel GetYearlyByMonthReport(int year)
    {
        var userId = HttpContext.Items[Constants.USER_ID] as int?;
        return YearlyByMonthReportServiceModel.From(_reportsManager.GetYearlyByMonthReport(userId.Value!, year));
    }

    
    
    [HttpGet("yearlybycat/{year}")]
    [ServiceFilter<SecurityFilterAttribute>]
    public YearlyByCatReportServiceModel GetYearlyByCatReport(int year)
    {
        var userId = HttpContext.Items[Constants.USER_ID] as int?;
        return YearlyByCatReportServiceModel.From(_reportsManager.GetYearlyByCatReport(userId.Value!, year));
    }
}