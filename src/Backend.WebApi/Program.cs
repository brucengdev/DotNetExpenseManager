using Backend.WebApi;
using Backend.Core.Manager;
using Backend.Core.Repository;
using Backend.Models;
using Backend.WebApi.ActionFilters;
using Backend.WebApi.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ExpensesContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policyBuilder =>
        {
            policyBuilder.AllowAnyOrigin();
            policyBuilder.AllowAnyHeader();
            policyBuilder.AllowAnyMethod();
        });
    });
}

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAccountManager, AccountManager>((services) =>
{
    var userRepo = services.GetRequiredService<IUserRepository>();
    var configuration = services.GetRequiredService<IConfiguration>();
    var salt = configuration.GetValue<string>("HashSalt") ?? Constants.DEFAULT_HASH_SALT;
    var tokenExpiration = configuration.GetValue<int?>("TokenExpirationHours") ?? Constants.TOKEN_EXPIRATION_HOURS;
    var am = new AccountManager(userRepo, salt, tokenExpiration);
    return am;
});
builder.Services.AddScoped<IEntryRepository, EntryRepository>();
builder.Services.AddScoped<IEntryManager, EntryManager>();

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICategoryManager, CategoryManager>();

builder.Services.AddScoped<ITagsRepository, TagsRepository>();
builder.Services.AddScoped<ITagsManager, TagsManager>();

builder.Services.AddScoped<IPayeeRepository, PayeeRepository>();
builder.Services.AddScoped<IPayeeManager, PayeeManager>();

builder.Services.AddScoped<IDataManager, DataManager>();

builder.Services.AddScoped<IReportsRepository, ReportsRepository>();
builder.Services.AddScoped<IReportsManager, ReportsManager>();

builder.Services.AddScoped<SecurityFilterAttribute>();

builder.Services.AddControllers();

var app = builder.Build();

//create DB
using(var serviceScope = app.Services.CreateScope())
{
    var context = serviceScope.ServiceProvider.GetService<ExpensesContext>();
    context.Database.Migrate();
    var adminPassword = builder.Configuration.GetValue<string>("AdminPassword") 
                        ?? Constants.DEFAULT_ADMIN_PASSWORD;
    var salt = builder.Configuration.GetValue<string>("HashSalt") 
               ?? Constants.DEFAULT_HASH_SALT;
    SeedData.Initialize(context, adminPassword, salt);
}

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors();
}

app.UseHttpsRedirection();

app.MapControllers()
    .WithOpenApi();

app.Run();
