using MediatR;
using MimoDigital.Domain.Entities;
using MimoDigital.Application.Common.Interfaces;
using NanoidDotNet;

namespace MimoDigital.Application.CouponBooks.Commands.CreateCouponBook;

public class CreateCouponBookHandler : IRequestHandler<CreateCouponBookCommand, string>
{
    private readonly IApplicationDbContext _context; // Usa a Interface

    public CreateCouponBookHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<string> Handle(CreateCouponBookCommand request, CancellationToken cancellationToken)
    {
        // Gerar NanoID seguro e curto (10 caracteres)
        var slug = Nanoid.Generate(size: 10);
        
        // No momento, como não temos Auth, usaremos um Guid vazio para o CreatorId
        var couponBook = new CouponBook(request.Title, request.Description, slug, Guid.Empty);

        foreach (var item in request.Coupons)
        {
            couponBook.AddCoupon(item.Title, item.Description);
        }

        _context.CouponBooks.Add(couponBook);
        await _context.SaveChangesAsync(cancellationToken);

        return slug;
    }
}