using MediatR;
using Microsoft.EntityFrameworkCore;
using MimoDigital.Application.Common.Interfaces;

namespace MimoDigital.Application.CouponBooks.Queries.GetCouponBookBySlug;

public class GetCouponBookBySlugHandler : IRequestHandler<GetCouponBookBySlugQuery, CouponBookDto?>
{
    private readonly IApplicationDbContext _context;

    public GetCouponBookBySlugHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CouponBookDto?> Handle(GetCouponBookBySlugQuery request, CancellationToken cancellationToken)
    {
        var book = await _context.CouponBooks
            .Include(x => x.Coupons)
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Slug == request.Slug, cancellationToken);

        if (book == null) return null;

        return new CouponBookDto(
            book.Title,
            book.Description,
            book.Coupons.Select(c => new CouponItemDto(
                c.Id, 
                c.Title, 
                c.Description, 
                c.IsClaimed, 
                c.ClaimedAt)).ToList()
        );
    }
}