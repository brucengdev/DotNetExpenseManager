using Backend.Models;

namespace Backend;

public static class SeedData {
    public static void Initialize(ExpensesContext context)
    {
        if (context.Users != null && context.Users.Any())
        {
            return;
        }

        context.Users.Add(new User
        {
            Id = 0,
            Username = "admin",
            Password = "admin"
        });

        context.SaveChanges();
    }
}