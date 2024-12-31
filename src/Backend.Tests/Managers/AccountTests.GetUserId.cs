using Backend.Manager;
using Backend.Models;
using Backend.Tests.Mocks;
using Shouldly;

namespace Backend.Tests
{
    public partial class AccountTests
    {
        [Fact]
        public void Get_user_id_from_token_successfully()
        {
            //arrange
            var userRepo = new TestUserRepository();
            userRepo.AddUser(new User
            {
                Id = 14,
                Username = "johndoe",
                Password = "testPassword"
            });
            var sut = new AccountManager(userRepo);
            
            //act
            var result = sut.GetUserId("johndoe-2024-12-07-05-30-16");
            
            //assert
            result.ShouldBe(14);
        }
    }
}