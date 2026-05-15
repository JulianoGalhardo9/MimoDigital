using System;

namespace MimoDigital.Domain.Entities;

public class Coupon
{
    public Guid Id { get; private set; }
    public Guid CouponBookId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public bool IsClaimed { get; private set; }
    public DateTime? ClaimedAt { get; private set; }

    // Construtor para o EF Core
    private Coupon() { }

    public Coupon(Guid couponBookId, string title, string description)
    {
        Id = Guid.NewGuid();
        CouponBookId = couponBookId;
        Title = title;
        Description = description;
        IsClaimed = false;
    }

    // Lógica de Negócio: Resgate do Cupom (Idempotente)
    public void Claim()
    {
        if (IsClaimed) return; // Se já foi resgatado, não faz nada (Idempotência)

        IsClaimed = true;
        ClaimedAt = DateTime.UtcNow;
    }
}