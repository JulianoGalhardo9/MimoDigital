using System;
using System.Collections.Generic;

namespace MimoDigital.Domain.Entities;

public class CouponBook
{
    public Guid Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    
    // O Slug será nosso NanoID para o link seguro (ex: "vKj8-9LmP")
    public string Slug { get; private set; } = string.Empty;
    
    public Guid CreatorId { get; private set; }
    public DateTime CreatedAt { get; private set; }

    // Propriedade de navegação para os cupons
    private readonly List<Coupon> _coupons = new();
    public IReadOnlyCollection<Coupon> Coupons => _coupons.AsReadOnly();

    // Construtor privado para o EF Core
    private CouponBook() { }

    public CouponBook(string title, string description, string slug, Guid creatorId)
    {
        if (string.IsNullOrWhiteSpace(title)) throw new ArgumentException("Título é obrigatório.");
        if (string.IsNullOrWhiteSpace(slug)) throw new ArgumentException("Slug é obrigatório.");

        Id = Guid.NewGuid();
        Title = title;
        Description = description;
        Slug = slug;
        CreatorId = creatorId;
        CreatedAt = DateTime.UtcNow;
    }

    public void AddCoupon(string title, string description)
    {
        _coupons.Add(new Coupon(Id, title, description));
    }
}