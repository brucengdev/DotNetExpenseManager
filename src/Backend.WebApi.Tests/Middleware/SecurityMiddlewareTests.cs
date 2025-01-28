using Backend.WebApi.Middleware;

namespace Backend.WebApi.Tests.Middleware;

public class SecurityMiddlewareTests
{
    [Fact]
    public void Must_set_auth_token_to_http_context()
    {
        //arrange
        var sut = new SecurityMiddleware();
    }
}