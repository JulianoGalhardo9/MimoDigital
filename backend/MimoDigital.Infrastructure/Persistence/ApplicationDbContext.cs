using Microsoft.EntityFrameworkCore;
using MimoDigital.Domain.Entities;

namespace MimoDigital.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<CouponBook> CouponBooks => Set<CouponBook>();
    public DbSet<Coupon> Coupons => Set<Coupon>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configuração de CouponBook
        modelBuilder.Entity<CouponBook>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Slug).IsUnique(); // Index para busca rápida pelo link
            entity.Property(e => e.Title).IsRequired().HasMaxLength(100);
            
            // Relacionamento 1:N
            entity.HasMany(e => e.Coupons)
                  .WithOne()
                  .HasForeignKey(e => e.CouponBookId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Configuração de Coupon
        modelBuilder.Entity<Coupon>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(100);
        });

        base.OnModelCreating(modelBuilder);
    }
}