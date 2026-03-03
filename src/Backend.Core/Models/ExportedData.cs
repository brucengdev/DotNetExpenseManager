using System.Text.Json.Serialization;

namespace Backend.Models;

public class ExportedEntry
{
    public string Title { get; set; }
    
    public string? Notes { get; set; }
    
    public string? CategoryName { get; set; }
    
    public IEnumerable<string>? TagNames { get; set; }
    
    public string? PayeeName { get; set; }

    public DateTime Date { get; set; }
    
    public float Value { get; set; }
}