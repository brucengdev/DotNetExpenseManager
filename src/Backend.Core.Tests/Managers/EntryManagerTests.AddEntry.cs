using Backend.Core.Manager;
using Backend.Models;
using Backend.Core.Tests.Mocks;
using Shouldly;

namespace Backend.Core.Tests
{
    public partial class EntryManagerTests
    {
        [Fact]
        public void AddEntry_must_be_successful()
        {
            //arrange
            var entryRepo = new TestEntryRepository();
            var sut = new EntryManager(entryRepo);
            
            //act
            var inputEntry = new Entry()
            {
                Title = "Test entry",
                Value = -10.22f,
                Date = new DateTime(2022, 4, 22),
                UserId = 23,
                CategoryId = 1
            };
            sut.AddEntry(inputEntry);
            
            //assert
            entryRepo.Entries.Count().ShouldBe(1);
            var savedEntry = entryRepo.Entries.First();
            savedEntry.Title.ShouldBe("Test entry");
            savedEntry.Date.ShouldBe(new DateTime(2022, 4, 22));
            savedEntry.Value.ShouldBe(-10.22f);
            savedEntry.UserId.ShouldBe(23);
            savedEntry.CategoryId.ShouldBe(1);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        [InlineData(-3)]
        public void AddEntry_must_throw_invalid_user_id_on_invalid_user_id(int userId)
        {
            //arrange
            var entryRepo = new TestEntryRepository();
            var sut = new EntryManager(entryRepo);
            
            //act & assert
            var inputEntry = new Entry()
            {
                Title = "Test entry",
                Value = -10.22f,
                Date = new DateTime(2022, 4, 22),
                UserId = userId
            };
            Should.Throw<InvalidUserIdException>(() => sut.AddEntry(inputEntry));
        }
    }
}