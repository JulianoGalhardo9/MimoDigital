using MediatR;

namespace MimoDigital.Application.CouponBooks.Commands.CreateCouponBook;

public record CreateCouponBookCommand(
    string Title,
    string Description,
    List<CreateCouponItemDto> Coupons
) : IRequest<string>; // Retorna o Slug (NanoID) criado

public record CreateCouponItemDto(
    string Title,
    string Description
);