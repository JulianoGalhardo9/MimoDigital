import { useParams } from 'react-router-dom';
import { useCouponBook } from '../hooks/useCouponBook';
import type { CouponItem } from '../types';

export default function BookView() {
  const { slug } = useParams<{ slug: string }>();
  const { bookQuery, claimMutation } = useCouponBook(slug || '');

  if (bookQuery.isLoading) {
    return (
      <>
        <style>{baseStyles}</style>
        <div className="bv-wrap">
          <div className="bv-orb1" />
          <div className="bv-loading">
            <span className="bv-loading-icon">🎁</span>
            <p>Carregando mimos...</p>
          </div>
        </div>
      </>
    );
  }

  if (bookQuery.isError) {
    return (
      <>
        <style>{baseStyles}</style>
        <div className="bv-wrap">
          <div className="bv-orb1" />
          <div className="bv-loading">
            <span className="bv-loading-icon">😢</span>
            <p>Talão não encontrado.</p>
          </div>
        </div>
      </>
    );
  }

  const book = bookQuery.data;

  return (
    <>
      <style>{baseStyles}</style>
      <div className="bv-wrap">
        <div className="bv-orb1" />
        <div className="bv-orb2" />

        <header className="bv-header">
          <div className="bv-tag">✦ Presente Especial ✦</div>
          <h1 className="bv-title">{book?.title}</h1>
          {book?.description && (
            <p className="bv-desc">{book.description}</p>
          )}
        </header>

        <div className="bv-grid">
          {book?.coupons.map((coupon: CouponItem, index: number) => (
            <div
              key={coupon.id}
              className={`bv-coupon ${coupon.isClaimed ? 'claimed' : ''}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {coupon.isClaimed && (
                <div className="bv-stamp">✓ Resgatado</div>
              )}

              <div className="bv-coupon-top">
                <div className="bv-coupon-info">
                  <h3 className={`bv-coupon-title ${coupon.isClaimed ? 'crossed' : ''}`}>
                    {coupon.title}
                  </h3>
                  {coupon.description && (
                    <p className={`bv-coupon-desc ${coupon.isClaimed ? 'crossed' : ''}`}>
                      {coupon.description}
                    </p>
                  )}
                </div>
                {!coupon.isClaimed && (
                  <span className="bv-ticket-icon" aria-hidden="true">🎟</span>
                )}
              </div>

              <button
                onClick={() => claimMutation.mutate(coupon.id)}
                disabled={coupon.isClaimed || claimMutation.isPending}
                className="bv-btn"
              >
                {coupon.isClaimed ? 'Aproveite o seu presente! 🎉' : 'Resgatar Cupom'}
              </button>

              <span className="bv-num">
                N° {String(index + 1).padStart(3, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .bv-wrap {
    font-family: 'DM Sans', sans-serif;
    background: #1a0a0f;
    min-height: 100vh;
    padding: 0 16px 80px;
    position: relative;
    overflow: hidden;
    user-select: none;
  }
  .bv-orb1 {
    position: fixed; width: 600px; height: 320px;
    background: radial-gradient(ellipse, rgba(190,60,90,0.14) 0%, transparent 70%);
    top: 0; left: 50%; transform: translateX(-50%);
    pointer-events: none; z-index: 0;
  }
  .bv-orb2 {
    position: fixed; width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(220,120,80,0.09) 0%, transparent 70%);
    bottom: -80px; right: -80px;
    pointer-events: none; z-index: 0;
  }

  .bv-loading {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    min-height: 100vh; gap: 12px;
    color: rgba(245,232,224,0.4); font-size: 14px; position: relative; z-index: 1;
  }
  .bv-loading-icon { font-size: 36px; }

  .bv-header {
    text-align: center; padding: 52px 0 36px; position: relative; z-index: 1;
  }
  .bv-tag {
    display: inline-block;
    font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
    color: rgba(224,112,144,0.7);
    border: 1px solid rgba(224,112,144,0.25);
    border-radius: 20px; padding: 4px 14px; margin-bottom: 14px;
  }
  .bv-title {
    font-family: 'Playfair Display', serif;
    font-size: 32px; font-weight: 700;
    color: #f5e8e0; margin: 0 0 10px; line-height: 1.2;
  }
  .bv-desc {
    font-size: 14px; color: rgba(245,232,224,0.45);
    font-weight: 300; margin: 0; max-width: 300px; margin: 0 auto;
  }

  .bv-grid {
    max-width: 440px; margin: 0 auto; position: relative; z-index: 1;
    display: flex; flex-direction: column; gap: 14px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .bv-coupon {
    background: #231118;
    border: 1.5px dashed rgba(200,100,120,0.28);
    border-radius: 20px; padding: 22px 24px;
    position: relative; overflow: hidden;
    transition: border-color 0.3s, transform 0.2s;
    animation: fadeUp 0.5s ease both;
  }
  .bv-coupon:not(.claimed):hover {
    border-color: rgba(200,100,120,0.55);
    transform: translateY(-2px);
  }
  .bv-coupon.claimed {
    background: #1e1614;
    border-style: solid;
    border-color: rgba(50,150,90,0.28);
  }

  /* Tear notch left */
  .bv-coupon::before {
    content: ''; position: absolute;
    left: -8px; top: 50%; transform: translateY(-50%);
    width: 15px; height: 15px;
    background: #1a0a0f; border-radius: 50%;
    border: 1.5px solid rgba(200,100,120,0.28);
    border-left: none;
  }
  /* Tear notch right */
  .bv-coupon::after {
    content: ''; position: absolute;
    right: -8px; top: 50%; transform: translateY(-50%);
    width: 15px; height: 15px;
    background: #1a0a0f; border-radius: 50%;
    border: 1.5px solid rgba(200,100,120,0.28);
    border-right: none;
  }
  .bv-coupon.claimed::before,
  .bv-coupon.claimed::after {
    border-color: rgba(50,150,90,0.28);
  }

  @keyframes stampIn {
    from { transform: rotate(-10deg) scale(2.5); opacity: 0; }
    to { transform: rotate(-10deg) scale(1); opacity: 1; }
  }
  .bv-stamp {
    position: absolute; top: 16px; right: 18px;
    border: 2.5px solid rgba(50,180,100,0.65);
    color: rgba(50,180,100,0.75);
    font-size: 9px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
    padding: 4px 10px; border-radius: 6px;
    transform: rotate(-10deg);
    background: rgba(18,30,22,0.92);
    pointer-events: none;
    animation: stampIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    font-family: 'DM Sans', sans-serif;
  }

  .bv-coupon-top {
    display: flex; justify-content: space-between;
    align-items: flex-start; margin-bottom: 14px;
  }
  .bv-coupon-info { flex: 1; padding-right: 12px; }
  .bv-coupon-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 700;
    color: #f5e8e0; margin: 0 0 5px; line-height: 1.2;
    transition: color 0.3s;
  }
  .bv-coupon-title.crossed {
    text-decoration: line-through;
    color: rgba(245,232,224,0.3);
  }
  .bv-coupon-desc {
    font-size: 13px; color: rgba(245,232,224,0.45); margin: 0;
    transition: color 0.3s;
  }
  .bv-coupon-desc.crossed { color: rgba(245,232,224,0.2); }

  @keyframes sway {
    0%, 100% { transform: rotate(-5deg); }
    50% { transform: rotate(5deg); }
  }
  .bv-ticket-icon {
    font-size: 28px; flex-shrink: 0;
    animation: sway 2.5s ease-in-out infinite;
    display: inline-block;
  }

  .bv-btn {
    width: 100%;
    background: linear-gradient(135deg, #c23a5a 0%, #d96040 100%);
    border: none; border-radius: 12px;
    color: #fff; font-family: 'Playfair Display', serif;
    font-size: 15px; font-weight: 700; font-style: italic;
    padding: 14px; cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
  }
  .bv-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
  .bv-btn:active:not(:disabled) { transform: scale(0.98); }
  .bv-btn:disabled {
    background: rgba(255,255,255,0.06);
    color: rgba(245,232,224,0.3);
    cursor: not-allowed; font-style: normal;
  }

  .bv-num {
    position: absolute; bottom: 14px; left: 24px;
    font-size: 9px; letter-spacing: 1px;
    color: rgba(245,232,224,0.15); font-weight: 300;
    font-family: 'DM Sans', sans-serif;
  }
`;
