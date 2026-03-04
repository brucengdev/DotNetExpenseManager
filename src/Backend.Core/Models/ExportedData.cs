using System.Globalization;
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

public class ExportedData
{
    public IEnumerable<ExportedEntry> Entries { get; set; }

    public void Parse(string csvData)
    {
        csvData = csvData.Replace("\r", "");
        var lines = csvData.Split('\n');
        var entryList = new List<ExportedEntry>();
        for (int i = 1; i < lines.Length; i++)
        {
            var line = lines[i];

            var tokens = line.Split(';');
            //1/17/2026,-$292,000,Đi lại,Đặt xe đi xem nhà Eurowindow,,Nguyên,
            entryList.Add(new()
            {
                Date = ParseDate(tokens[0]),
                Value = ParseValue(tokens[1]),
                CategoryName = tokens[2],
                Title = tokens[3],
                TagNames = [tokens[4]],
                PayeeName = tokens[5],
                Notes = tokens[6]
            });
        }

        var entryWithNotes = entryList.Where(e => e.Notes != "");

        Entries = entryList;
    }

    private DateTime ParseDate(string dateStr)
    {
        return DateTime.ParseExact(dateStr, "M/d/yyyy", CultureInfo.InvariantCulture);
    }

    private float ParseValue(string valueStr)
    {
        return float.Parse(valueStr.Replace("$", "").Replace(",", ""));
    }
}