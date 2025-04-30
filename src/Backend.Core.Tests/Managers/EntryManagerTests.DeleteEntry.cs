using Backend.Core.Manager;
using Backend.Models;
using Backend.Core.Tests.Mocks;
using Shouldly;

namespace Backend.Core.Tests
{
    public partial class EntryManagerTests
    {
        [Fact]
        public void DeleteEntry_must_be_successful()
        {
            //arrange
            var entryRepo = new TestEntryRepository();
            var sut = new EntryManager(entryRepo);
            entryRepo.Entries.Add(new Entry()
            {
                Id = 0,
                Title = "Test entry A",
                Value = -10.22f,
                Date = new DateTime(2022, 4, 22),
                UserId = 23,
                CategoryId = 1
            });
            entryRepo.Entries.Add(new Entry()
            {
                Id = 1,
                Title = "Test entry B",
                Value = -10.22f,
                Date = new DateTime(2022, 4, 22),
                UserId = 23,
                CategoryId = 1
            });
            
            //act
            sut.DeleteEntry(0);
            
            //assert
            entryRepo.Entries.Count().ShouldBe(1);
            entryRepo.Entries[0].Id.ShouldBe(1);
        }

        [Fact]
        public void DeleteEntry_must_throw_EntryNotFoundException_for_non_existing_entry()
        {
            //arrange
            var entryRepo = new TestEntryRepository();
            var sut = new EntryManager(entryRepo);
            entryRepo.Entries.Add(new Entry()
            {
                Id = 1,
                Title = "Test entry B",
                Value = -10.22f,
                Date = new DateTime(2022, 4, 22),
                UserId = 23,
                CategoryId = 1
            });
            
            //act
            var exception = Record.Exception(() => sut.DeleteEntry(2));
            
            //assert
            exception.ShouldNotBeNull();
            exception.ShouldBeOfType<EntryNotFoundException>();
        }
    }
}