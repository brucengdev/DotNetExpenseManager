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
            var result = sut.GetUserId("johndoe-2024-12-07-05-30-16");
            
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
            Should.Throw<UserNotFoundException>(() => sut.GetUserId("johndoe-2024-12-07-05-30-16"));
        }
    }
}