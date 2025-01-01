namespace Backend.Models
{
    public class Entry
    {
        public Entry() { }
        public Entry(Entry other)
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
        public User User { get; set; }
    }
}
