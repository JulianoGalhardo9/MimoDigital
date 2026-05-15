using DigitalCoupon.Application.Common.Interfaces;
using DigitalCoupon.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DigitalCoupon.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        // Mude esta linha para garantir a conversão de tipo
        services.AddScoped<IApplicationDbContext>(provider => 
            (IApplicationDbContext)provider.GetRequiredService<ApplicationDbContext>());

        return services;
    }
}