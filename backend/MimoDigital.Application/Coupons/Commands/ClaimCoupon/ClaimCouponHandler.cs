using MediatR;
using Microsoft.EntityFrameworkCore;
using MimoDigital.Application.Common.Interfaces;

namespace MimoDigital.Application.Coupons.Commands.ClaimCoupon;

public class ClaimCouponHandler : IRequestHandler<ClaimCouponCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public ClaimCouponHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(ClaimCouponCommand request, CancellationToken cancellationToken)
    {
        var coupon = await _context.Coupons
            .FirstOrDefaultAsync(x => x.Id == request.CouponId, cancellationToken);

        if (coupon == null) return false;

        // A mágica da idempotência acontece dentro do método Claim() da entidade
        coupon.Claim();

        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}