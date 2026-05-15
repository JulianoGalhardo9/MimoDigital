using DigitalCoupon.Domain.Common;

namespace DigitalCoupon.Domain.Entities;

public enum CouponStatus
{
    Available,
    Claimed
}

public class Coupon : Entity
{
    public string Title { get; private set; } = default!;
    public string? Description { get; private set; }
    public CouponStatus Status { get; private set; }
    public DateTime? ClaimedAt { get; private set; }

    // Construtor necessário para o Entity Framework
    private Coupon() { }

    public Coupon(string title, string? description)
    {
        Title = title;
        Description = description;
        Status = CouponStatus.Available;
    }

    public void Claim()
    {
        if (Status == CouponStatus.Claimed)
            throw new InvalidOperationException("Este cupom já foi resgatado.");
        
        Status = CouponStatus.Claimed;
        ClaimedAt = DateTime.UtcNow;
    }
}