using Microsoft.EntityFrameworkCore;
using MimoDigital.Application.Common.Interfaces;
using MimoDigital.Infrastructure.Persistence;
using MimoDigital.Application.CouponBooks.Commands.CreateCouponBook; // Namespace de um dos handlers

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar Banco de Dados
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

// 2. Mapear a Interface para o Contexto Real (Scoped)
builder.Services.AddScoped<IApplicationDbContext>(provider => 
    provider.GetRequiredService<ApplicationDbContext>());

// 3. Registrar MediatR (Apontando para o projeto onde estão os Handlers)
builder.Services.AddMediatR(cfg => {
    cfg.RegisterServicesFromAssembly(typeof(CreateCouponBookCommand).Assembly);
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Porta padrão do Vite
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("DefaultPolicy");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();