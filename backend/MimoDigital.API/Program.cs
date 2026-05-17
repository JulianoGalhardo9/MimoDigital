using Microsoft.EntityFrameworkCore;
using MimoDigital.Application.Common.Interfaces;
using MimoDigital.Infrastructure.Persistence;
using MimoDigital.Application.CouponBooks.Commands.CreateCouponBook;

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar Banco de Dados
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

// 2. Mapear a Interface para o Contexto Real
builder.Services.AddScoped<IApplicationDbContext>(provider =>
    provider.GetRequiredService<ApplicationDbContext>());

// 3. Registrar MediatR
builder.Services.AddMediatR(cfg => {
    cfg.RegisterServicesFromAssembly(typeof(CreateCouponBookCommand).Assembly);
});

// 4. CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger em todos os ambientes (útil para testar no Render)
app.UseSwagger();
app.UseSwaggerUI();

// CORS antes de tudo
app.UseCors("DefaultPolicy");

// HTTPS redirect desativado (Render e Vercel já fazem isso no load balancer)
// app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();
app.Run();