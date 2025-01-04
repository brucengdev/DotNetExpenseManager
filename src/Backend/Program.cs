using Backend;
using Backend.Manager;
using Backend.Models;
using Backend.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

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
        });
    });
}

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAccountManager, AccountManager>();

builder.Services.AddScoped<IEntryRepository, EntryRepository>();
builder.Services.AddScoped<IEntryManager, EntryManager>();

builder.Services.AddControllers();

var app = builder.Build();

//create DB
using(var serviceScope = app.Services.CreateScope())
{
    var context = serviceScope.ServiceProvider.GetService<ExpensesContext>();
    context.Database.EnsureCreated();
    SeedData.Initialize(context);
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
