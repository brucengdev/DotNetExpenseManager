using Backend.Core.Models;

namespace Backend.Core.Manager;

public interface IPayeeManager
{
    void AddPayee(NewPayee newPayee, int userId);
    IEnumerable<Payee> GetPayees(int userId);
}