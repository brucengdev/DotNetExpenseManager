using System.Security.Cryptography;
using System.Text;
using Backend.Core.Manager;
using Backend.Models;
using Backend.Core.Tests.Mocks;
using Shouldly;

namespace Backend.Core.Tests
{
    public partial class AccountManagerTests
    {
        public const string HashSalt = "alibabaand40thieves";
        [Fact]
        public void CreateUser_must_be_successful()
        {
            //arrange
            var userRepo = new TestUserRepository();

            //act
            var salt = "abcdefgh";
            var sut = new AccountManager(userRepo, salt);
            var result = sut.CreateUser("johndoe", "testpass");
            
            //assert
            result.ShouldBe(CreateUserResult.Success);
            var user = userRepo.GetUser("johndoe");
            user.ShouldNotBeNull();
            user.PasswordHash.ShouldBe(HashPassword("testpass", "abcdefgh"));
        }

        internal static string HashPassword(string password, string salt = HashSalt)
        {
            var phraseToHash = password + salt;
            var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(phraseToHash));
            return Convert.ToBase64String(bytes);
        }

        [Fact]
        public void CreateUser_must_fail_when_user_already_exists()
        {
            //arrange
            var userRepo = new TestUserRepository();
            userRepo.AddUser(new User() { 
                Username = "johndoe", 
                PasswordHash = HashPassword("testpass")
            });

            //act
            var sut = new AccountManager(userRepo, AccountManagerTests.HashSalt);
            var result = sut.CreateUser("johndoe", "testpass2");
            
            //assert
            result.ShouldBe(CreateUserResult.AlreadyExists);
            var user = userRepo.GetUser("johndoe");
            user.ShouldNotBeNull();
            user.PasswordHash.ShouldBe(HashPassword("testpass"));
        }
    }
}