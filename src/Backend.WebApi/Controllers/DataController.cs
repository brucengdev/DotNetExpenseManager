using Backend.Core.Manager;
using Backend.Models;
using Backend.WebApi.ActionFilters;
using Backend.WebApi.Extensions;
using Microsoft.AspNetCore.Mvc;


namespace Backend.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class DataController:ControllerBase
{
    private readonly IDataManager _dataManager;
    public DataController(IDataManager dm)
    {
        _dataManager = dm;
    }
    
    [HttpPut("[action]")]
    [ServiceFilter<SecurityFilterAttribute>]
    public async Task<ActionResult> Import()
    {
        using var streamReader = new StreamReader(Request.Body);
        var csvData = await streamReader.ReadToEndAsync();
        var exportedData = new ExportedData();
        exportedData.Parse(csvData);
        _dataManager.Import(exportedData, this.CurrentUserId());
        return Ok();
    }
}