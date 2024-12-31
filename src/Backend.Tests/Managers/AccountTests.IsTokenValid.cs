using Backend.Manager;
using Backend.Models;
using Backend.Tests.Mocks;
using Shouldly;

namespace Backend.Tests
{
    public partial class AccountTests
    {
        public static IEnumerable<object[]> PositiveCases = new List<object[]>
        {
            new object[] { new DateTime(2024, 12, 31, 19, 4, 0) },
            new object[] { new DateTime(2024, 12, 31, 19, 3, 0) },
            new object[] { new DateTime(2024, 12, 31, 18, 4, 0) },
            new object[] { new DateTime(2024, 12, 31, 17, 4, 0) },
        };
        
        [Theory]
        [MemberData(nameof(PositiveCases))]
        public void IsTokenValid_must_return_true_if_token_is_valid(DateTime currentTime)
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
            var result = sut.IsTokenValid("johndoe-2024-12-31-19-04", currentTime);
            
            //assert
            result.ShouldBeTrue();
        }
    }
}