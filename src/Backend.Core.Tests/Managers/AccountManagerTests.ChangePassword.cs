using Backend.Core.Manager;
using Backend.Core.Tests.Mocks;
using Shouldly;

namespace Backend.Core.Tests
{
    public partial class AccountManagerTests
    {
        [Fact]
        public void ChangePassword_must_be_successful()
        {
            //arrange
            var userRepo = new TestUserRepository();
            var salt = "abcdefgh";
            var sut = new AccountManager(userRepo, salt);
            var result = sut.CreateUser("johndoe", "testpass");
            
            //assert
            result.ShouldBe(CreateUserResult.Success);
            var user = userRepo.GetUser("johndoe");
            user.ShouldNotBeNull();
            user.PasswordHash.ShouldBe(HashPassword("testpass", "abcdefgh"));

            //act and assert
            sut.ChangePassword("johndoe", "changedpass").ShouldBeTrue();
            user = userRepo.GetUser("johndoe");
            user.ShouldNotBeNull();
            user.PasswordHash.ShouldBe(HashPassword("changedpass", "abcdefgh"));
        }

        [Fact]
        public void ChangeUser_must_fail_when_user_does_not_exist()
        {
            //arrange
            var userRepo = new TestUserRepository();

            //act
            var sut = new AccountManager(userRepo, AccountManagerTests.HashSalt);
            var result = sut.ChangePassword("johndoe", "testpass2");
            
            //assert
            result.ShouldBeFalse();
        }
    }
}