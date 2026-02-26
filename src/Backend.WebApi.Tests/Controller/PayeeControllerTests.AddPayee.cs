using Backend.WebApi.ActionFilters;
using Backend.WebApi.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shouldly;

namespace Backend.WebApi.Tests.Controller;

public partial class PaypeeControllerTests
{
    [Fact]
    public void Add_payee_config()
    {
        var method = Utils.GetMethod<PayeesController>(nameof(PayeesController.AddPayee));
        method.ShouldNotBeNull();

        var attributes = method?.GetCustomAttributes(typeof(HttpPostAttribute), true);
        attributes.Length.ShouldBeGreaterThan(0);

        var postAttr = attributes[0] as HttpPostAttribute;
        postAttr.Template.ShouldBeNull();
    
        var secAttrs = method?.GetCustomAttributes(typeof(ServiceFilterAttribute<SecurityFilterAttribute>), true);
        secAttrs.Length.ShouldBeGreaterThan(0, "Must require authorization");
    }
}