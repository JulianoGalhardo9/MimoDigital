using MediatR;

namespace MimoDigital.Application.CouponBooks.Queries.GetCouponBookBySlug;

public record GetCouponBookBySlugQuery(string Slug) : IRequest<CouponBookDto?>;