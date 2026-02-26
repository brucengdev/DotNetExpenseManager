using Backend.Core.Models;
using Backend.Core.Repository;

namespace Backend.Core.Manager;

public class PayeeManager: IPayeeManager
{
    private IPayeeRepository _payeeRepository;

    public PayeeManager(IPayeeRepository payeeRepository)
    {
        _payeeRepository = payeeRepository;
    }
    public void AddPayee(NewPayee newPayee, int userId)
    {
        _payeeRepository.AddPayee(new Payee(newPayee, userId));
    }

    public IEnumerable<Payee> GetPayees(int userId)
    {
        return _payeeRepository.GetPayees(userId);
    }
}