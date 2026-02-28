using Backend.WebApi.ActionFilters;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApi.Extensions;

internal static class ControllerBaseExtensions
{
    internal static int CurrentUserId(this ControllerBase controller)
    {
        return SecurityFilterAttribute.GetUserId(controller);
    }
}