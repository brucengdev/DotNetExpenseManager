using Backend.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class ExpensesContext: DbContext
    {
        public DbSet<Entry> Entries { get;set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        
        public DbSet<EntryTagMapping> EntryTagMappings { get; set; }
        public DbSet<Tag> Tags { get; set; }

        public ExpensesContext(DbContextOptions<ExpensesContext> options)
            : base(options)
        {
        }

    }
}
