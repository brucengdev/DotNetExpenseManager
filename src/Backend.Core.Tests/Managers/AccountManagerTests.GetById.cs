using Backend.Core.Manager;
using Backend.Models;
using Backend.Core.Tests.Mocks;
using Shouldly;

namespace Backend.Core.Tests
{
    public partial class AccountManagerTests
    {
        [Fact]
        public void GetById_is_successful()
        {
            //arrange
            var userRepo = new TestUserRepository();
            var testUser = new User
            {
                Id = 12,
                Username = "johndoe",
                PasswordHash = HashPassword("testPassword")
            };
            userRepo.AddUser(testUser);
            var sut = new AccountManager(userRepo, AccountManagerTests.HashSalt);
            
            //act
            var result = sut.GetById(12);
            
            //assert
            result.ShouldBeEquivalentTo(testUser);
        }
        
        [Fact]
        public void GetById_returns_null_if_user_is_not_found()
        {
            //arrange
            var userRepo = new TestUserRepository();
            var testUser = new User
            {
                Id = 12,
                Username = "johndoe",
                PasswordHash = HashPassword("testPassword")
            };
            userRepo.AddUser(testUser);
            var sut = new AccountManager(userRepo, AccountManagerTests.HashSalt);
            
            //act
            var result = sut.GetById(23);
            
            //assert
            result.ShouldBeNull();
        }
    }
}