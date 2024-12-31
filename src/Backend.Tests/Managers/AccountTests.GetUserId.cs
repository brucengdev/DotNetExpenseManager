using Backend.Manager;
using Backend.Models;
using Backend.Tests.Mocks;
using Shouldly;

namespace Backend.Tests
{
    public partial class AccountTests
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
                Password = "testPassword"
            });
            var sut = new AccountManager(userRepo);
            
            //act
            var currentTime = new DateTime(2024, 12, 7, 5, 29, 0);
            var result = sut.GetUserId("johndoe-2024-12-07-05-30", currentTime);
            
            //assert
            result.ShouldBe(userId);
        }
        
        [Fact]
        public void Throws_user_not_found_exception_when_user_is_invalid()
        {
            //arrange
            var userRepo = new TestUserRepository();
            var sut = new AccountManager(userRepo);
            
            //act + assert
            var currentTime = new DateTime(2024, 12, 7, 5, 29, 0);
            Should.Throw<UserNotFoundException>(() => sut.GetUserId("johndoe-2024-12-07-05-30", currentTime));
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
                Password = "testPassword"
            });
            var sut = new AccountManager(userRepo);
            
            //act + assert
            var currentTime = new DateTime(2024, 12, 7, 5, 31, 0);
            Should.Throw<TokenExpiredException>(
                () => sut.GetUserId("johndoe-2024-12-07-05-30", currentTime)
            );
        }
    }
}