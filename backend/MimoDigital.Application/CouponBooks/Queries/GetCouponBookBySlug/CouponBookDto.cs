namespace MimoDigital.Application.CouponBooks.Queries.GetCouponBookBySlug;

public record CouponBookDto(
    string Title,
    string Description,
    List<CouponItemDto> Coupons
);

public record CouponItemDto(
    Guid Id,
    string Title,
    string Description,
    bool IsClaimed,
    DateTime? ClaimedAt
);