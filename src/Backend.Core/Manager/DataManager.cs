using Backend.Core.Repository;
using Backend.Models;

namespace Backend.Core.Manager;

public class DataManager:IDataManager
{
    private readonly IEntryRepository _entryRepository;
    public DataManager(
        IEntryRepository entryRepo)
    {
        _entryRepository = entryRepo;
    }
    public void Import(ExportedData data, int userId)
    {
        //clear data
        _entryRepository.Clear(userId);
        
        //import data
        var projectIdMap = ImportProjects(data, userId);
        var tagIdMap = ImportTags(data, userId);
        ImportTasks(data, projectIdMap, tagIdMap, userId);
    }

    private void ImportTasks(
        ExportedData data, 
        Dictionary<int, int> projectIdMap, 
        Dictionary<int, int> tagIdMap,
        int userId)
    {
        foreach (var exportedTask in data.Tasks ?? [])
        {
            int? projectId = null;
            if (exportedTask.ProjectId != null 
                && projectIdMap.TryGetValue(exportedTask.ProjectId.Value, out var savedProjectId))
            {
                projectId = savedProjectId;
            }
            
            var item = new Entry()
            {
                Title = exportedTask.Name,
                Value = exportedTask.Completed,
                UserId = userId,
                PayeeId = exportedTask.PayeeId
            };
            var itemId = _entryRepository.CreateItem(item);
            foreach (var exportedTagId in exportedTask.TagIds ?? [])
            {
                if (!tagIdMap.TryGetValue(exportedTagId, out var savedTagId)) { continue; }
                _itemTagMappingRepo.CreateMapping(new()
                {
                    ItemId = itemId,
                    TagId = savedTagId
                });
            }
        }
    }

    private Dictionary<int, int> ImportTags(ExportedData data, int userId)
    {
        var idMap = new Dictionary<int, int>();
        foreach (var exportedTag in data.Tags ?? [])
        {
            var tag = new Tag()
            {
                Name = exportedTag.Name,
                UserId = userId
            };
            var tagId = _tagRepo.CreateTag(tag);
            idMap[exportedTag.Id] = tagId;
        }

        return idMap;
    }

    private Dictionary<int, int> ImportCategories(ExportedData data, int userId)
    {
        var idMap = new Dictionary<int, int>();
        foreach (var exportedProject in data.Projects ?? [])
        {
            var project = new Project()
            {
                Name = exportedProject.Name,
                Done = exportedProject.Completed,
                Later = exportedProject.Later,
                UserId = userId
            };
            var projectId = _projectRepo.CreateProject(project);
            idMap[exportedProject.Id] = projectId;
        }

        return idMap;
    }
}