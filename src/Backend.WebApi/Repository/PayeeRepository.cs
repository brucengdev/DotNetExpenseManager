using Backend.Core.Models;
using Backend.Core.Repository;
using Backend.Models;

namespace Backend.WebApi.Repository;

public class PayeeRepository: IPayeeRepository
{
    private ExpensesContext _dbContext;
    public PayeeRepository(ExpensesContext dbContext)
    {
        _dbContext = dbContext;
    }
    public void AddPayee(Payee payee)
    {
        _dbContext.Payees.Add(payee);
        _dbContext.SaveChanges();
    }

    public IEnumerable<Payee> GetPayees(int userId)
    {
        return _dbContext.Payees.Where(p => p.UserId == userId);
    }
}