using Backend.Manager;
using Backend.Models;
using Backend.Tests.Mocks;
using Shouldly;

namespace Backend.Tests
{
    public partial class AccountTests
    {
        [Fact]
        public void IsTokenValid_must_return_true_if_token_is_valid()
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
            var currentTime = new DateTime(2024, 12, 31, 19, 4, 0);
            var result = sut.IsTokenValid("johndoe-2024-12-31-19-04", currentTime);
            
            //assert
            result.ShouldBeTrue();
        }
    }
}