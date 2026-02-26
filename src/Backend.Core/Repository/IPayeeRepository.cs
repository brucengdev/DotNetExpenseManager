using Backend.Core.Models;

namespace Backend.Core.Repository;

public interface IPayeeRepository
{
    void AddPayee(Payee payee);
    IEnumerable<Payee> GetPayees(int userId);
}