using Backend.Core.Manager;
using Backend.Models;
using Backend.Core.Tests.Mocks;
using Shouldly;

namespace Backend.Core.Tests
{
    public partial class AccountManagerTests
    {
        public static IEnumerable<object[]> PositiveCases = new List<object[]>
        {
            new object[] { new DateTime(2024, 12, 31, 19, 4, 0) },
            new object[] { new DateTime(2024, 12, 31, 19, 3, 0) },
            new object[] { new DateTime(2024, 12, 31, 18, 4, 0) },
            new object[] { new DateTime(2024, 12, 31, 17, 4, 0) },
        };
        
        [Theory]
        [MemberData(nameof(PositiveCases))]
        public void IsTokenValid_must_return_true_if_token_is_valid(DateTime currentTime)
        {
            //arrange
            var userRepo = new TestUserRepository();
            userRepo.AddUser(new User
            {
                Username = "johndoe",
                PasswordHash = HashPassword("testPassword")
            });
            var sut = new AccountManager(userRepo, AccountManagerTests.HashSalt);
            
            //act
            var token = Utilities.Token("johndoe-2024-12-31-19-04", "testPassword");
            var result = sut.IsTokenValid(token, currentTime);
            
            //assert
            result.ShouldBeTrue();
        }

        public static IEnumerable<object[]> NegativeCases = new List<object[]>
        {
            new object[]
            {
                "wrong username",
                "johndoe2", 
                new DateTime(2024, 12, 31, 19, 4, 0),
                Utilities.Token("johndoe-2024-12-31-19-04", "testPassword")
            },
            new object[]
            {
                "invalid hash",
                "johndoe", 
                new DateTime(2024, 12, 31, 19, 4, 0),
                Utilities.Token("johndoe-2024-12-31-19-04", "wrongPassword")
            },
            new object[]
            {
                "expired token 1",
                "johndoe", 
                new DateTime(2024, 12, 31, 19, 5, 0),
                Utilities.Token("johndoe-2024-12-31-19-04", "testPassword")
            },
            new object[]
            {
                "expired token 2",
                "johndoe", 
                new DateTime(2024, 12, 31, 20, 4, 0),
                Utilities.Token("johndoe-2024-12-31-19-04", "testPassword")
            },
            new object[]
            {
                "expired token 3",
                "johndoe", 
                new DateTime(2025, 1, 1, 19, 5, 0),
                Utilities.Token("johndoe-2024-12-31-19-04", "testPassword")
            },
            new object[]
            {
                "invalid token format 1",
                "johndoe", 
                new DateTime(2024, 12, 31, 19, 5, 0),
                Utilities.Token("johndoe-202412311904", "testPassword")
            },
            new object[]
            {
                "invalid token format 2",
                "johndoe", 
                new DateTime(2024, 12, 31, 19, 5, 0),
                Utilities.Token("johndoe202412311904", "testPassword")
            },
            new object[]
            {
                "empty token",
                "johndoe", 
                new DateTime(2024, 12, 31, 19, 5, 0),
                Utilities.Token("", "testPassword")
            },
            new object[]
            {
                "null token",
                "johndoe", 
                new DateTime(2024, 12, 31, 19, 5, 0),
                null
            },
        };
        
        [Theory]
        [MemberData(nameof(NegativeCases))]
        public void IsTokenValid_must_return_false_if_token_is_invalid(
            string testname,
            string username, 
            DateTime currentTime,
            string token)
        {
            //arrange
            var userRepo = new TestUserRepository();
            userRepo.AddUser(new User
            {
                Username = username,
                PasswordHash = HashPassword("testPassword")
            });
            var sut = new AccountManager(userRepo, AccountManagerTests.HashSalt);
            
            //act
            var result = sut.IsTokenValid(token, currentTime);
            
            //assert
            result.ShouldBeFalse();
        }
    }
}