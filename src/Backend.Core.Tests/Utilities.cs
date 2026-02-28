using System.Security.Cryptography;
using System.Text;

namespace Backend.Core.Tests;

internal class Utilities
{
    
    private static string CreateHash(string input, string salt = AccountManagerTests.HashSalt)
    {
        using var algo = SHA256.Create();
        var phraseToHash = input + salt;
        var hash = algo.ComputeHash(Encoding.UTF8.GetBytes(phraseToHash));
        return Convert.ToBase64String(hash);
    }

    public static string Token(string info, string password, string salt = AccountManagerTests.HashSalt)
    {
        return $"{info}-{CreateHash(info + CreateHash(password, salt), salt)}";
    }
}