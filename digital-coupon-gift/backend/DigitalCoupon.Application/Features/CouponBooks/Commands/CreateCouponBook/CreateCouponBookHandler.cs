using DigitalCoupon.Application.Common.Interfaces; // Use a Interface
using DigitalCoupon.Domain.Entities;
using MediatR;
using NanoidDotNet;

namespace DigitalCoupon.Application.Features.CouponBooks.Commands.CreateCouponBook;

public class CreateCouponBookHandler : IRequestHandler<CreateCouponBookCommand, Guid>
{
    private readonly IApplicationDbContext _context; // Mude para a Interface

    public CreateCouponBookHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateCouponBookCommand request, CancellationToken cancellationToken)
    {
        var accessCode = Nanoid.Generate(size: 12);

        var book = new CouponBook(
            request.Title,
            request.GiverName,
            request.ReceiverName,
            accessCode
        );

        foreach (var c in request.Coupons)
        {
            book.AddCoupon(c.Title, c.Description);
        }

        _context.CouponBooks.Add(book);
        await _context.SaveChangesAsync(cancellationToken);

        return book.Id;
    }
}