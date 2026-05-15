using Microsoft.EntityFrameworkCore;
using MimoDigital.Domain.Entities;

namespace MimoDigital.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<CouponBook> CouponBooks { get; }
    DbSet<Coupon> Coupons { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}