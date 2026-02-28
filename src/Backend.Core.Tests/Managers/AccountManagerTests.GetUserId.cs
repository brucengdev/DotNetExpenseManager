using Backend.Core.Manager;
using Backend.Models;
using Backend.Core.Tests.Mocks;
using Shouldly;

namespace Backend.Core.Tests
{
    public partial class AccountManagerTests
    {
        [Theory]
        [InlineData(14)]
        [InlineData(22)]
        public void Get_user_id_from_token_successfully(int userId)
        {
            //arrange
            var userRepo = new TestUserRepository();
            userRepo.AddUser(new User
            {
                Id = userId,
                Username = "johndoe",
                PasswordHash = HashPassword("testPassword")
            });
            var sut = new AccountManager(userRepo, AccountManagerTests.HashSalt);
            
            //act
            var currentTime = new DateTime(2024, 12, 7, 5, 29, 0);
            var result = sut.GetUserId(Utilities.Token("johndoe-2024-12-07-05-30", "testPassword"), currentTime);
            
            //assert
            result.ShouldBe(userId);
        }
        
        [Fact]
        public void Throws_user_not_found_exception_when_user_is_invalid()
        {
            //arrange
            var userRepo = new TestUserRepository();
            var sut = new AccountManager(userRepo, AccountManagerTests.HashSalt);
            
            //act + assert
            var currentTime = new DateTime(2024, 12, 7, 5, 29, 0);
            var accessToken = Utilities.Token("johndoe-2024-12-07-05-30", "testPass");
            Should.Throw<UserNotFoundException>(() => sut.GetUserId(accessToken, currentTime));
        }
        
        [Fact]
        public void Throws_token_expired_exception_when_token_has_expired()
        {
            //arrange
            var userRepo = new TestUserRepository();
            userRepo.AddUser(new User
            {
                Id = 12,
                Username = "johndoe",
                PasswordHash = HashPassword("testPassword")
            });
            var sut = new AccountManager(userRepo, AccountManagerTests.HashSalt);
            
            //act + assert
            var currentTime = new DateTime(2024, 12, 7, 5, 31, 0);
            var accessToken = Utilities.Token("johndoe-2024-12-07-05-30", "testPassword");
            Should.Throw<TokenExpiredException>(
                () => sut.GetUserId(accessToken, currentTime)
            );
        }

        public static IEnumerable<object[]> GetUserIdInvalidCases = new List<object[]>
        {
            new object[] { "invalid hash",
                Utilities.Token("johndoe-2024-12-07-05-30", "wrongPassword") },
            new object[] { "wrong format 1", 
                Utilities.Token("johndoe-2024sdfsdfds-432432423-asdfasdfsdfdsfff", "testPassword") },
            new object[] { "wrong format 2",
                Utilities.Token("johndoe-34324235232432-4324324324322423-532523525", "testPassword") },
            new object[] { "wrong format 3",
                Utilities.Token("343242352324324324324324322423532523525", "testPassword") },
            new object[] { "empty string with hash",
                Utilities.Token("", "testPassword") },
            new object[] { "empty string", 
                "" },
            new object[] { "null", 
                null },
        };
        [Theory]
        [MemberData(nameof(GetUserIdInvalidCases))]
        public void Throws_malformed_token_exception_on_invalid_token(string testCase, string token)
        {
            //arrange
            var userRepo = new TestUserRepository();
            userRepo.AddUser(new User
            {
                Id = 12,
                Username = "johndoe",
                PasswordHash = HashPassword("testPassword")
            });
            var sut = new AccountManager(userRepo, AccountManagerTests.HashSalt);
            
            //act + assert
            var currentTime = new DateTime(2024, 12, 7, 5, 31, 0);
            Should.Throw<MalformedTokenException>(
                () => sut.GetUserId(token, currentTime)
            );
        }
    }
}