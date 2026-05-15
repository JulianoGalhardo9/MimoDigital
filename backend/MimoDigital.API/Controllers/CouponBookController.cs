using MediatR;
using Microsoft.AspNetCore.Mvc;
using MimoDigital.Application.CouponBooks.Commands.CreateCouponBook;

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
}