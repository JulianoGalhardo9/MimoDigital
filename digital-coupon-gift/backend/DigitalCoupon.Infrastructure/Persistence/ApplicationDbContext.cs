using DigitalCoupon.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using DigitalCoupon.Application.Common.Interfaces;

namespace DigitalCoupon.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<CouponBook> CouponBooks => Set<CouponBook>();
    public DbSet<Coupon> Coupons => Set<Coupon>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CouponBook>(entity =>
        {
            entity.HasIndex(e => e.AccessCode).IsUnique();
            entity.HasMany(e => e.Coupons).WithOne().OnDelete(DeleteBehavior.Cascade);
        });

        base.OnModelCreating(modelBuilder);
    }
}