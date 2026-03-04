using Backend.Core.Models;
using Backend.Core.Repository;
using Backend.Models;

namespace Backend.Core.Manager;

public class DataManager:IDataManager
{
    private readonly IEntryRepository _entryRepository;
    private readonly ITagsRepository _tagsRepository;
    private readonly IPayeeRepository _payeeRepository;
    private readonly ICategoryRepository _categoryRepository;
    public DataManager(
        IEntryRepository entryRepo,
        ITagsRepository tagsRepo,
        ICategoryRepository categoryRepo,
        IPayeeRepository payeeRepo)
    {
        _entryRepository = entryRepo;
        _tagsRepository = tagsRepo;
        _payeeRepository = payeeRepo;
        _categoryRepository = categoryRepo;
    }
    public void Import(ExportedData data, int userId)
    {
        var entries = data.Entries;
        
        //import data
        var categoryNameIdMap = ImportCategories(entries, userId);
        var tagNameIdMap = ImportTags(entries, userId);
        var payeeNameIdMap = ImportPayees(entries, userId);
        ImportEntries(entries, categoryNameIdMap, tagNameIdMap, payeeNameIdMap, userId);
    }

    private void ImportEntries(
        IEnumerable<ExportedEntry> entries, 
        Dictionary<string, int> categoryNameIdMap, 
        Dictionary<string, int> tagNameIdMap,
        Dictionary<string, int> payeeNameIdMap,
        int userId)
    {
        foreach (var exportedEntry in entries ?? [])
        {
            int categoryId = 1;//1 is Uncategorized
            if (exportedEntry.CategoryName != null 
                && categoryNameIdMap.TryGetValue(exportedEntry.CategoryName, out var savedCategoryId))
            {
                categoryId = savedCategoryId;
            }

            var entryTagMappings = (exportedEntry.TagNames ?? [])
                .Select(tagName => new EntryTagMapping()
                {
                    TagId = tagNameIdMap[tagName]
                }).ToList();

            int? payeeId = null;
            if (exportedEntry.PayeeName != null && payeeNameIdMap.TryGetValue(exportedEntry.PayeeName, out var savedPayeeId))
            {
                payeeId = savedPayeeId;
            }
            
            var entry = new Entry()
            {
                Title = exportedEntry.Title,
                Value = exportedEntry.Value,
                Date = exportedEntry.Date,
                Notes = exportedEntry.Notes,
                UserId = userId,
                PayeeId = payeeId,
                CategoryId = categoryId,
                EntryTagMappings = entryTagMappings
            };
            _entryRepository.AddEntry(entry);
        }
    }

    private Dictionary<string, int> ImportTags(IEnumerable<ExportedEntry> entries, int userId)
    {
        var nameIdMap = new Dictionary<string, int>();
        
        foreach (var entry in entries ?? [])
        {
            foreach (var tagName in entry.TagNames)
            {
                if (nameIdMap.ContainsKey(tagName))
                {
                    continue;
                }
                var tag = new Tag()
                {
                    Name = tagName,
                    UserId = userId
                };
                _tagsRepository.AddTag(tag);
                nameIdMap[tagName] = tag.Id;
            }
        }

        return nameIdMap;
    }

    private Dictionary<string, int> ImportCategories(IEnumerable<ExportedEntry> data, int userId)
    {
        var nameIdMap = new Dictionary<string, int>();

        foreach (var entry in data ?? [])
        {
            if (entry.CategoryName == null)
            {
                continue;
            }

            var categoryName = entry.CategoryName;
            if (nameIdMap.ContainsKey(categoryName))
            {
                continue;
            }

            var category = new Category()
            {
                Name = categoryName,
                UserId = userId
            };
            _categoryRepository.AddCategory(category);
            nameIdMap[categoryName] = category.Id;
        }
        return nameIdMap;
    }
    
    private Dictionary<string, int> ImportPayees(IEnumerable<ExportedEntry> data, int userId)
    {
        var nameIdMap = new Dictionary<string, int>();

        foreach (var entry in data ?? [])
        {
            if (entry.PayeeName == null)
            {
                continue;
            }

            var payeeName = entry.PayeeName;
            if (nameIdMap.ContainsKey(payeeName))
            {
                continue;
            }

            var payee = new Payee()
            {
                Name = payeeName,
                UserId = userId
            };
            _payeeRepository.AddPayee(payee);
            nameIdMap[payeeName] = payee.Id;
        }
        return nameIdMap;
    }
}