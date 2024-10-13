using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class ExpenesesContext: DbContext
    {
        public DbSet<Entry> Entries { get;set; }
        public DbSet<Category> Categories { get; set; }
    }
}
