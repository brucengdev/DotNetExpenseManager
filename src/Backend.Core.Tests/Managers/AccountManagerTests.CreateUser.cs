using Backend.Core.Manager;
using Backend.Models;
using Backend.Core.Tests.Mocks;
using Shouldly;

namespace Backend.Core.Tests
{
    public partial class AccountManagerTests
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
        
        [Fact]
        public void CreateUser_must_fail_when_user_already_exists()
        {
            //arrange
            var userRepo = new TestUserRepository();
            userRepo.AddUser(new User() { Username = "johndoe", Password = "testpass" });

            //act
            var sut = new AccountManager(userRepo);
            var result = sut.CreateUser("johndoe", "testpass2");
            
            //assert
            result.ShouldBe(CreateUserResult.AlreadyExists);
            var user = userRepo.GetUser("johndoe");
            user.ShouldNotBeNull();
            user.Password.ShouldBe("testpass");
        }
    }
}