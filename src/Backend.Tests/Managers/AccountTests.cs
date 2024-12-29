using Backend.Manager;
using Backend.Models;
using Backend.Repository;
using Backend.Tests.Mocks;
using Moq;
using Shouldly;

namespace Backend.Tests
{
    public class AccountTests
    {
        [Fact]
        public void Verify_correct_user()
        {
            //arrange
            var userRepo = new TestUserRepository();
            userRepo.CreateUser(new User
            {
                Username = "johndoe",
                Password = "testPassword"
            });
            var sut = new AccountManager(userRepo);
            
            //act
            var result = sut.VerifyUser("johndoe", "testpassword");
            
            //assert
            result.ShouldBeTrue();
        }
        
        [Fact]
        public void Verify_incorrect_password()
        {
            //arrange
            var userRepo = new TestUserRepository();
            userRepo.CreateUser(new User
            {
                Username = "johndoe",
                Password = "testPassword"
            });
            var sut = new AccountManager(userRepo);

            //act
            var result = sut.VerifyUser("johndoe", "testpassword222");
            
            //assert
            result.ShouldBeFalse();
        }
    }
}