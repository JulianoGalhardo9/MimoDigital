using MediatR;
using Microsoft.AspNetCore.Mvc;
using MimoDigital.Application.CouponBooks.Commands.CreateCouponBook;
using MimoDigital.Application.CouponBooks.Queries.GetCouponBookBySlug;
using MimoDigital.Application.Coupons.Commands.ClaimCoupon;

namespace MimoDigital.API.Controllers;

[ApiController]
[Route("api/coupon-books")]
public class CouponBookController : ControllerBase
{
    private readonly IMediator _mediator;

    public CouponBookController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<string>> Create(CreateCouponBookCommand command)
    {
        var slug = await _mediator.Send(command);
        return Ok(new { slug });
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<CouponBookDto>> GetBySlug(string slug)
    {
        var query = new GetCouponBookBySlugQuery(slug);
        var result = await _mediator.Send(query);

        if (result == null) return NotFound();

        return Ok(result);
    }

    [HttpPost("coupons/{id}/claim")]
    public async Task<ActionResult> Claim(Guid id)
    {
        var command = new ClaimCouponCommand(id);
        var result = await _mediator.Send(command);

        if (!result) return NotFound();

        return NoContent(); // 204 significa que deu certo e não há conteúdo extra para retornar
    }
}