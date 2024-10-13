using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class ExpensesContext: DbContext
    {
        public DbSet<Entry> Entries { get;set; }
        public DbSet<Category> Categories { get; set; }

        public ExpensesContext(DbContextOptions<ExpensesContext> options)
            :base(options)
        { }

    }
}
