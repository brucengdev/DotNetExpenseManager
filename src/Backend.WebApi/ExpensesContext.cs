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
        
        public DbSet<Payee> Payees { get; set; }

        public ExpensesContext(DbContextOptions<ExpensesContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Payee>()
                .HasIndex(p => p.Name)
                .IsUnique();

            modelBuilder.Entity<Payee>()
                .Property(p => p.Name)
                .IsRequired();
        }
    }
}
