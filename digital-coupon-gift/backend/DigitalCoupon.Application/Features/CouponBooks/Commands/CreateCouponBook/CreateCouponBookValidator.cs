using FluentValidation;

namespace DigitalCoupon.Application.Features.CouponBooks.Commands.CreateCouponBook;

public class CreateCouponBookValidator : AbstractValidator<CreateCouponBookCommand>
{
    public CreateCouponBookValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
        RuleFor(x => x.GiverName).NotEmpty();
        RuleFor(x => x.ReceiverName).NotEmpty();
        RuleFor(x => x.Coupons).NotEmpty().WithMessage("O talão deve ter pelo menos um cupom.");
    }
}