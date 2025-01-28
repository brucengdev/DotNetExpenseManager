using Backend.WebApi.Middleware;
using Microsoft.AspNetCore.Http;
using Shouldly;

namespace Backend.WebApi.Tests.Middleware;

public class SecurityMiddlewareTests
{
    [Fact]
    public async Task Must_execute_next_middleware_when_valid()
    {
        //arrange
        bool movedToNextMiddleware = false;
        var sut = new SecurityMiddleware(async (context) =>
        {
            movedToNextMiddleware = true;
        });
        
        //act
        var testContext = new DefaultHttpContext();
        testContext.Request.Path = "/test?accessToken=foo";
        await sut.InvokeAsync(testContext);
        
        //assert
        movedToNextMiddleware.ShouldBeTrue();
    }
}