using Backend.Manager;
using Shouldly;

namespace Backend.Tests
{
    public class AccountTests
    {
        [Fact]
        public void Verify_correct_user()
        {
            //arrange
            var sut = new AccountManager();
            
            //act
            var result = sut.VerifyUser("johndoe", "testpassword");
            
            //assert
            result.ShouldBeTrue();
        }
    }
}