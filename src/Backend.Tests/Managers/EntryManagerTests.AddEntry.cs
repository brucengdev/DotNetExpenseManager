using Backend.Manager;
using Backend.Models;
using Backend.Tests.Mocks;
using Shouldly;

namespace Backend.Tests
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
                Date = new DateTime(2022, 4, 22)
            };
            sut.AddEntry(inputEntry);
            
            //assert
            entryRepo.Entries.Count().ShouldBe(1);
        }
    }
}