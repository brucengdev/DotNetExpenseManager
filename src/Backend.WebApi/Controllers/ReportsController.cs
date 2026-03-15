using Backend.Core.Manager;
using Backend.WebApi.ActionFilters;
using Backend.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ReportsController: ControllerBase
{
    private readonly IReportManager _reportManager;

    public ReportsController(IReportManager reportManager)
    {
        _reportManager = reportManager;
    }
    
    [HttpGet("monthly/{month}")]
    [ServiceFilter<SecurityFilterAttribute>]
    public MonthlyReportServiceModel GetMonthlyReport(DateTime month)
    {
        var userId = HttpContext.Items[Constants.USER_ID] as int?;
        return MonthlyReportServiceModel.From(_reportManager.GetMonthlyReport(userId.Value!, month));
    }
}