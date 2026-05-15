using DigitalCoupon.Domain.Common;

namespace DigitalCoupon.Domain.Entities;

public class CouponBook : Entity
{
    public string Title { get; private set; } = default!;
    public string GiverName { get; private set; } = default!; // Ex: "Filho"
    public string ReceiverName { get; private set; } = default!; // Ex: "Mãe"
    public string AccessCode { get; private set; } = default!; // NanoID ou Guid v7

    private readonly List<Coupon> _coupons = new();
    
    // Virtual permite que o EF Core faça Lazy Loading se configurado
    public virtual IReadOnlyCollection<Coupon> Coupons => _coupons.AsReadOnly();

    private CouponBook() { }

    public CouponBook(string title, string giverName, string receiverName, string accessCode)
    {
        Title = title;
        GiverName = giverName;
        ReceiverName = receiverName;
        AccessCode = accessCode;
    }

    public void AddCoupon(string title, string? description)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("O título do cupom é obrigatório.");

        _coupons.Add(new Coupon(title, description));
    }
}