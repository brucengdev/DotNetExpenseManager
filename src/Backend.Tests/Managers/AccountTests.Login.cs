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
            var result = sut.CreateAccessToken("johndoe", "testPassword");
            
            //assert
            result.ShouldBe("dummyToken");
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

            //act and assert
            Should.Throw<UserNotFoundException>(
                () => sut.CreateAccessToken("johndoe2", "testpassword222")
            );
        }
    }
}