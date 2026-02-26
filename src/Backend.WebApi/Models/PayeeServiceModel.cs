using Backend.Core.Models;

namespace Backend.WebApi.Models;

public class PayeeServiceModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public PayeeServiceModel(Payee payee)
    {
        Id = payee.Id;
        Name = payee.Name;
    }
}