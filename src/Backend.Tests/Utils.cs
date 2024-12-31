using System.Reflection;

namespace Backend.Tests;

public class Utils
{
    public static MethodInfo? GetMethod<TClass>(string methodName)
    {
        return typeof(TClass).GetMethods()
            .SingleOrDefault(x => x.Name == methodName);
    }
}