using MediatR;

namespace MimoDigital.Application.Coupons.Commands.ClaimCoupon;

public record ClaimCouponCommand(Guid CouponId) : IRequest<bool>;