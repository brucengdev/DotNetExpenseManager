using Backend.Models;

namespace Backend.Core.Manager;

public interface IDataManager
{
    void Import(ExportedData data, int userId);
}