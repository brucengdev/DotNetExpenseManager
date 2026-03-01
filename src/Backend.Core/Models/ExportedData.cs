using System.Text.Json.Serialization;

namespace Backend.Models;

public class ExportedData
{
    [JsonPropertyName("projects")]
    public List<ExportedProject> Projects { get; set; }
    
    [JsonPropertyName("tags")]
    public List<ExportedTag> Tags { get; set; }
    
    [JsonPropertyName("tasks")]
    public List<ExportedTask> Tasks { get; set; }
}

public class ExportedProject
{
    [JsonPropertyName("completed")]
    public bool Completed { get; set; }
    
    [JsonPropertyName("later")]
    public bool Later { get; set; }
    
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("description")]
    public string? Description { get; set; }
}

public class ExportedTag
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("name")]
    public string Name { get; set; }
}

public class ExportedTask
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("description")]
    public string? Description { get; set; }
    
    [JsonPropertyName("completed")]
    public bool Completed { get; set; }
    
    [JsonPropertyName("later")]
    public bool Later { get; set; }

    [JsonPropertyName("projectId")]
    public int? ProjectId { get; set; }
    
    [JsonPropertyName("tagIds")]
    public IEnumerable<int>? TagIds { get; set; }
    
    [JsonPropertyName("note")]
    public string? Note { get; set; }
    
    [JsonPropertyName("pinned")]
    public bool? Pinned { get; set; }
    
    [JsonPropertyName("priority")]
    public bool? Priority { get; set; }
}