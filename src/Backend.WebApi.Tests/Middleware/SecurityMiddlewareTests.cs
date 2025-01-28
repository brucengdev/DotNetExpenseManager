using Backend.WebApi.Middleware;
using Microsoft.AspNetCore.Http;

namespace Backend.WebApi.Tests.Middleware;

public class SecurityMiddlewareTests
{
    [Fact]
    public void Must_set_auth_token_to_http_context()
    {
        //arrange
        var sut = new SecurityMiddleware(async (context) =>
        {
        });
        
        //act
        var testContext = new DefaultHttpContext();
        testContext.Request.Path = "/test?accessToken=foo";
        sut.InvokeAsync(testContext);
    }
}