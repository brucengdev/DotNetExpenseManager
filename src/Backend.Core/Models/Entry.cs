namespace Backend.Models
{
    public class Entry: EntryPlain
    {
        public Entry(): base()
        {
        }
        
        public Entry(EntryPlain other): base(other) { }

        public Entry(Entry other): base(other)
        {
            User = other.User;
        }
        public User User { get; set; }
        
        public Category Category { get; set; }
    }
    
    public class EntryPlain
    {
        public EntryPlain() { }
        public EntryPlain(EntryPlain other)
        {
            Value = other.Value;
            Date = other.Date;
            Title = other.Title;
            CategoryId = other.CategoryId;
        }
        public int Id { get; set; }
        public float Value { get; set; }
        public DateTime Date { get; set; }
        public string Title { get;set; }
        public int UserId { get; set; }
        
        public int? CategoryId { get; set; }
    }
}
