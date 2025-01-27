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
                Password = "testPassword"
            });
            var sut = new AccountManager(userRepo);
            
            //act
            var result = sut.IsTokenValid("johndoe-2024-12-31-19-04", currentTime);
            
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
                "johndoe-2024-12-31-19-04"
            },
            new object[]
            {
                "expired token 1",
                "johndoe", 
                new DateTime(2024, 12, 31, 19, 5, 0),
                "johndoe-2024-12-31-19-04"
            },
            new object[]
            {
                "expired token 2",
                "johndoe", 
                new DateTime(2024, 12, 31, 20, 4, 0),
                "johndoe-2024-12-31-19-04"
            },
            new object[]
            {
                "expired token 3",
                "johndoe", 
                new DateTime(2025, 1, 1, 19, 5, 0),
                "johndoe-2024-12-31-19-04"
            },
            new object[]
            {
                "invalid token format 1",
                "johndoe", 
                new DateTime(2024, 12, 31, 19, 5, 0),
                "johndoe-202412311904"
            },
            new object[]
            {
                "invalid token format 2",
                "johndoe", 
                new DateTime(2024, 12, 31, 19, 5, 0),
                "johndoe202412311904"
            },
            new object[]
            {
                "empty token",
                "johndoe", 
                new DateTime(2024, 12, 31, 19, 5, 0),
                ""
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
                Password = "testPassword"
            });
            var sut = new AccountManager(userRepo);
            
            //act
            var result = sut.IsTokenValid(token, currentTime);
            
            //assert
            result.ShouldBeFalse();
        }
    }
}