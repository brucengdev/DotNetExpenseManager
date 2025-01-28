using Backend.WebApi.ActionFilters;
namespace Backend.WebApi.Tests.Middleware;

public class SecurityFilterAttributeTests
{
    [Fact]
    public async Task Must_execute_next_middleware_when_valid()
    {
        //arrange
        var sut = new SecurityFilterAttribute();
    }
}