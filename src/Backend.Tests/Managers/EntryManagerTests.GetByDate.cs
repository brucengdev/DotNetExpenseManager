using Backend.Manager;
using Backend.Models;
using Backend.Tests.Mocks;
using Shouldly;

namespace Backend.Tests
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
            var result = sut.GetByDate(date);
            
            //assert
            
        }
    }
}