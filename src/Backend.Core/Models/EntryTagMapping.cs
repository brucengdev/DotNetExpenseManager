using Backend.Models;

namespace Backend.Core.Models;

public class EntryTagMapping
{
    public int Id { get; set; }
    public int EntryId { get; set; }
    public Entry Entry { get; set; }
    public int TagId { get; set; }
    public Tag Tag { get; set; }
}