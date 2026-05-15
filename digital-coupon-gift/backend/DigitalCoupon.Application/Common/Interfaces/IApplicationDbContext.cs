using DigitalCoupon.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DigitalCoupon.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<CouponBook> CouponBooks { get; }
    DbSet<Coupon> Coupons { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}