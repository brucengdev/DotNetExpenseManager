using Backend.Manager;
using Backend.Models;
using Backend.Tests.Mocks;
using Shouldly;

namespace Backend.Tests
{
    public partial class AccountTests
    {
        [Fact]
        public void Verify_correct_user()
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
            var result = sut.VerifyUser("johndoe", "testPassword");
            
            //assert
            result.ShouldBeTrue();
        }
        
        [Fact]
        public void Verify_incorrect_password()
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
            var result = sut.VerifyUser("johndoe", "testpassword222");
            
            //assert
            result.ShouldBeFalse();
        }
        
        [Fact]
        public void Verify_incorrect_user()
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
            var result = sut.VerifyUser("johndoe2", "testpassword222");
            
            //assert
            result.ShouldBeFalse();
        }
    }
}