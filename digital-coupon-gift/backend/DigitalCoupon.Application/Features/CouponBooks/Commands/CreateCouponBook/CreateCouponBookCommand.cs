using MediatR;

namespace DigitalCoupon.Application.Features.CouponBooks.Commands.CreateCouponBook;

public record CreateCouponBookCommand(
    string Title,
    string GiverName,
    string ReceiverName,
    List<CreateCouponRequest> Coupons) : IRequest<Guid>;

public record CreateCouponRequest(string Title, string? Description);