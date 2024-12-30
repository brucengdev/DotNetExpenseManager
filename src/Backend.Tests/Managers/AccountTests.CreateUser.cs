using Backend.Manager;
using Backend.Models;
using Backend.Tests.Mocks;
using Shouldly;

namespace Backend.Tests
{
    public partial class AccountTests
    {
        [Fact]
        public void CreateUser_must_be_successful()
        {
            //arrange
            var userRepo = new TestUserRepository();

            //act
            var sut = new AccountManager(userRepo);
            var result = sut.CreateUser("johndoe", "testpass");
            
            //assert
            result.ShouldBe(CreateUserResult.Success);
            var user = userRepo.GetUser("johndoe");
            user.ShouldNotBeNull();
            user.Password.ShouldBe("testpass");
        }
    }
}