using Backend.Core.Models;
using Backend.WebApi.Models;

namespace Backend.Models
{
    public class Entry: EntryPlain
    {
        public Entry(): base()
        {
        }
        
        public Entry(EntryPlain other): base(other) { }

        public Entry(EntryServiceModel other) : base(other)
        {
            EntryTagMappings = other.TagIds
                .Select(tagId => new EntryTagMapping()
                {
                    Id = 0,
                    TagId = tagId,
                    EntryId = other.Id
                }).ToList();
        }

        public Entry(Entry other): base(other)
        {
            User = other.User;
        }
        public User User { get; set; }
        
        public Category Category { get; set; }
        
        public Payee Payee { get; set; }
        
        public IList<EntryTagMapping> EntryTagMappings { get; set; }
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
            Id = other.Id;
            UserId = other.UserId;
            PayeeId = other.PayeeId;
        }

        public override bool Equals(object? obj)
        {
            if (obj is not EntryPlain other)
            {
                return false;
            }

            return Value == other.Value
                   && Date == other.Date
                   && Title == other.Title
                   && CategoryId == other.CategoryId
                   && Id == other.Id
                   && PayeeId == other.PayeeId;
        }

        public int Id { get; set; }
        public float Value { get; set; }
        public DateTime Date { get; set; }
        public string Title { get;set; }
        public int UserId { get; set; }
        
        public int? CategoryId { get; set; }
        
        public int? PayeeId { get; set; }
    }
}
