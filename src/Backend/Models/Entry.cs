namespace Backend.Models
{
    public class Entry
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public DateTime Time { get; set; }

        public string Description { get;set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
