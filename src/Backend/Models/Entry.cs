namespace Backend.Models
{
    public class Entry: EntryPlain
    {
        public Entry(): base()
        {
        }

        public Entry(Entry other): base(other)
        {
            User = other.User;
        }
        public User User { get; set; }
    }
    
    public class EntryPlain
    {
        public EntryPlain() { }
        public EntryPlain(Entry other)
        {
            Value = other.Value;
            Date = other.Date;
            Title = other.Title;
        }
        public int Id { get; set; }
        public float Value { get; set; }
        public DateTime Date { get; set; }
        public string Title { get;set; }
        public int UserId { get; set; }
    }
}
