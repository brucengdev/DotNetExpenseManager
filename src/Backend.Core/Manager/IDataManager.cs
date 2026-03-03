using Backend.Models;

namespace Backend.Core.Manager;

public interface IDataManager
{
    void Import(IEnumerable<ExportedEntry> entries, int userId);
}