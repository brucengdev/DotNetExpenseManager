# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS buildbackend
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Backend.WebApi/Backend.WebApi.csproj", "Backend.WebApi/"] 
RUN dotnet restore "./Backend.WebApi/Backend.WebApi.csproj"
COPY . .
WORKDIR "/src/Backend.WebApi"
RUN dotnet build "./Backend.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM buildbackend AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Backend.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM node as buildfrontend
COPY webfrontend /src
WORKDIR /src
RUN echo "VITE_API_SERVER=/" > .env; npm i;npm run build

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=buildfrontend /src/dist ./wwwroot
ENTRYPOINT ["dotnet", "Backend.WebApi.dll"]