using Backend.Core.Manager;
using Backend.Models;
using Backend.Core.Tests.Mocks;
using Shouldly;

namespace Backend.Core.Tests
{
    public partial class AccountManagerTests
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
            var creationTime = new DateTime(2024, 12, 31, 18, 4, 0);
            var result = sut.CreateAccessToken("johndoe", "testPassword", creationTime);
            
            //assert
            result.ShouldBe($"johndoe-2024-12-31-19-04");
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

            //act & assert
            Should.Throw<WrongPasswordException>(
                () => sut.CreateAccessToken("johndoe", "testpassword222", DateTime.Now)
            );
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
                () => sut.CreateAccessToken("johndoe2", "testpassword222", DateTime.Now)
            );
        }
    }
}