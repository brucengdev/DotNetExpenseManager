using Backend.Core.Manager;
using Backend.Models;

namespace Backend.WebApi;

public static class SeedData {
    public static void Initialize(ExpensesContext context, string adminPassword, string salt)
    {
        if (context.Users != null && context.Users.Any())
        {
            return;
        }

        context.Users.Add(new User
        {
            Id = 0,
            Username = Constants.ADMIN_USERNAME,
            PasswordHash = AccountManager.CreateHash(adminPassword, salt)
        });

        context.Categories.Add(new Category
        {
            Id = 0,
            Name = "Uncategorized"
        });

        context.SaveChanges();
    }
}