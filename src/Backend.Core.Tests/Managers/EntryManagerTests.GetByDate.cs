using Backend.Core.Manager;
using Backend.Core.Tests.Mocks;
using Shouldly;

namespace Backend.Core.Tests
{
    public partial class EntryManagerTests
    {
        [Fact]
        public void GetByDate_must_be_successful()
        {
            //arrange
            var entryRepo = new TestEntryRepository();
            var sut = new EntryManager(entryRepo);
            var date = new DateTime(2022, 11, 4);
            entryRepo.Entries.Add(new() { Title = "entry1", Date = date, Value = -2, Id = 1, UserId = 1 });
            entryRepo.Entries.Add(new() { Title = "entry2", Date = date, Value = -3, Id = 2, UserId = 1 });
            entryRepo.Entries.Add(new() { Title = "entry2", Date = date.AddDays(1), Value = -4, Id = 3, UserId = 1 });
            entryRepo.Entries.Add(new() { Title = "entry2", Date = date, Value = -5, Id = 4, UserId = 2 });
            
            //act
            var result = sut.GetByDate(date, 1);
            
            //assert
            result.Count().ShouldBe(2);
            result.ToArray()[0].ShouldBeEquivalentTo(entryRepo.Entries[0]);
            result.ToArray()[1].ShouldBeEquivalentTo(entryRepo.Entries[1]);
        }
    }
}