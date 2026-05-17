import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { Plus, Trash2 } from 'lucide-react';

interface NewCoupon {
  title: string;
  description: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coupons, setCoupons] = useState<NewCoupon[]>([{ title: '', description: '' }]);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const createBookMutation = useMutation({
    mutationFn: async () => {
      const payload = { title, description, coupons: coupons.filter(c => c.title) };
      const { data } = await apiClient.post<{ slug: string }>('/coupon-books', payload);
      return data.slug;
    },
    onSuccess: (slug) => {
      setGeneratedLink(`${window.location.origin}/book/${slug}`);
    },
  });

  const handleAddCoupon = () => {
    setCoupons([...coupons, { title: '', description: '' }]);
  };

  const handleRemoveCoupon = (index: number) => {
    setCoupons(coupons.filter((_, i) => i !== index));
  };

  const handleCouponChange = (index: number, field: keyof NewCoupon, value: string) => {
    const updated = [...coupons];
    updated[index][field] = value;
    setCoupons(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    createBookMutation.mutate();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .home-wrap {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #1a0a0f;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 32px 16px 64px;
          position: relative;
          overflow: hidden;
        }
        .home-orb1 {
          position: fixed; width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(190,60,90,0.16) 0%, transparent 70%);
          top: -120px; right: -100px; pointer-events: none; z-index: 0;
        }
        .home-orb2 {
          position: fixed; width: 350px; height: 350px; border-radius: 50%;
          background: radial-gradient(circle, rgba(220,120,80,0.1) 0%, transparent 70%);
          bottom: 0; left: -80px; pointer-events: none; z-index: 0;
        }
        .home-card {
          background: #231118;
          border: 1px solid rgba(200,100,120,0.18);
          border-radius: 24px;
          width: 100%; max-width: 420px;
          padding: 36px 32px 40px;
          position: relative; z-index: 1;
          margin-top: 16px;
        }
        .home-header { text-align: center; margin-bottom: 32px; }
        .home-icon {
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, #c23a5a, #e0784a);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px; font-size: 24px;
        }
        .home-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px; font-weight: 700;
          color: #f5e8e0; margin: 0 0 6px; letter-spacing: -0.3px;
        }
        .home-subtitle { font-size: 13px; color: rgba(245,232,224,0.45); font-weight: 300; margin: 0; }

        .home-label {
          display: block; font-size: 11px; font-weight: 500;
          letter-spacing: 0.8px; color: rgba(245,232,224,0.5);
          text-transform: uppercase; margin-bottom: 8px;
        }
        .home-input, .home-textarea {
          width: 100%; box-sizing: border-box;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(200,100,120,0.2);
          border-radius: 12px;
          color: #f5e8e0;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; padding: 12px 16px; outline: none;
          transition: border-color 0.2s;
        }
        .home-input::placeholder, .home-textarea::placeholder { color: rgba(245,232,224,0.25); }
        .home-input:focus, .home-textarea:focus { border-color: rgba(200,80,110,0.6); }
        .home-textarea { resize: none; height: 72px; line-height: 1.5; }
        .home-field { margin-bottom: 20px; }
        .home-divider { border: none; border-top: 1px solid rgba(200,100,120,0.12); margin: 24px 0; }

        .home-coupons-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .home-coupons-label { font-size: 11px; font-weight: 500; letter-spacing: 0.8px; color: rgba(245,232,224,0.5); text-transform: uppercase; }
        .home-add-btn {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 500; color: #e07090;
          background: none; border: none; cursor: pointer; padding: 0;
          font-family: 'DM Sans', sans-serif; transition: color 0.2s;
        }
        .home-add-btn:hover { color: #f090a8; }

        .home-coupon-list { display: flex; flex-direction: column; gap: 10px; max-height: 260px; overflow-y: auto; padding-right: 2px; }
        .home-coupon-item {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(200,100,120,0.14);
          border-radius: 14px; padding: 14px 14px 12px; position: relative;
        }
        .home-coupon-field {
          width: 100%; box-sizing: border-box;
          background: transparent; border: none;
          border-bottom: 1px solid rgba(200,100,120,0.15);
          color: #f5e8e0; font-family: 'DM Sans', sans-serif;
          font-size: 13px; padding: 4px 28px 8px 0; outline: none; margin-bottom: 8px;
        }
        .home-coupon-field:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .home-coupon-field::placeholder { color: rgba(245,232,224,0.25); }
        .home-remove-btn {
          position: absolute; top: 10px; right: 12px;
          background: none; border: none; cursor: pointer;
          color: rgba(245,232,224,0.2); transition: color 0.2s; padding: 2px;
          display: flex; align-items: center;
        }
        .home-remove-btn:hover { color: #e05050; }

        .home-submit {
          width: 100%; margin-top: 28px;
          background: linear-gradient(135deg, #c23a5a 0%, #d96040 100%);
          border: none; border-radius: 14px;
          color: #fff; font-family: 'Playfair Display', serif;
          font-size: 16px; font-weight: 700; font-style: italic;
          padding: 16px; cursor: pointer; letter-spacing: 0.2px;
          transition: opacity 0.2s, transform 0.15s;
        }
        .home-submit:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
        .home-submit:active:not(:disabled) { transform: scale(0.98); }
        .home-submit:disabled { background: rgba(255,255,255,0.08); color: rgba(245,232,224,0.3); cursor: not-allowed; font-style: normal; }

        .home-success { text-align: center; padding: 20px 0 8px; }
        .home-success-icon { font-size: 40px; margin-bottom: 14px; }
        .home-success-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px; font-weight: 700; color: #f5e8e0; margin: 0 0 8px;
        }
        .home-success-desc { font-size: 13px; color: rgba(245,232,224,0.45); margin: 0 0 20px; }
        .home-link-box {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(200,100,120,0.2);
          border-radius: 12px; padding: 12px 16px;
          font-size: 12px; font-family: monospace;
          color: #e07090; word-break: break-all;
          margin-bottom: 6px; text-align: left; cursor: pointer;
          transition: background 0.2s;
        }
        .home-link-box:hover { background: rgba(255,255,255,0.08); }
        .home-copy-hint { font-size: 11px; color: rgba(245,232,224,0.3); margin: 0 0 20px; }
        .home-actions { display: flex; gap: 10px; }
        .home-btn-dark {
          flex: 1; background: rgba(245,232,224,0.08);
          border: 1px solid rgba(245,232,224,0.15);
          border-radius: 12px; color: #f5e8e0;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          padding: 12px; cursor: pointer; transition: background 0.2s;
        }
        .home-btn-dark:hover { background: rgba(245,232,224,0.13); }
        .home-btn-outline {
          flex: 1; background: transparent;
          border: 1px solid rgba(200,100,120,0.3);
          border-radius: 12px; color: #e07090;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          padding: 12px; cursor: pointer; transition: background 0.2s;
        }
        .home-btn-outline:hover { background: rgba(200,80,110,0.08); }
        .home-coupon-list::-webkit-scrollbar { width: 3px; }
        .home-coupon-list::-webkit-scrollbar-thumb { background: rgba(200,100,120,0.3); border-radius: 2px; }
      `}</style>

      <div className="home-wrap">
        <div className="home-orb1" />
        <div className="home-orb2" />

        <div className="home-card">
          <div className="home-header">
            <div className="home-icon">🎁</div>
            <h1 className="home-title">Criar Talão Digital</h1>
            <p className="home-subtitle">Monte um presente inesquecível e personalizado</p>
          </div>

          {!generatedLink ? (
            <form onSubmit={handleSubmit}>
              <div className="home-field">
                <label className="home-label">Título do Talão</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Aniversário da Mamãe"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="home-input"
                />
              </div>

              <div className="home-field">
                <label className="home-label">Descrição curta</label>
                <textarea
                  placeholder="Ex: Um presente cheio de mimos e carinho..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="home-textarea"
                />
              </div>

              <hr className="home-divider" />

              <div className="home-coupons-head">
                <span className="home-coupons-label">Cupons</span>
                <button type="button" onClick={handleAddCoupon} className="home-add-btn">
                  <Plus size={13} /> Adicionar Cupom
                </button>
              </div>

              <div className="home-coupon-list">
                {coupons.map((coupon, index) => (
                  <div key={index} className="home-coupon-item">
                    {coupons.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCoupon(index)}
                        className="home-remove-btn"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                    <input
                      type="text"
                      required
                      placeholder="Título do Cupom (Ex: Vale Jantar)"
                      value={coupon.title}
                      onChange={(e) => handleCouponChange(index, 'title', e.target.value)}
                      className="home-coupon-field"
                    />
                    <input
                      type="text"
                      placeholder="Descrição (Ex: Válido no restaurante X)"
                      value={coupon.description}
                      onChange={(e) => handleCouponChange(index, 'description', e.target.value)}
                      className="home-coupon-field"
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={createBookMutation.isPending}
                className="home-submit"
              >
                {createBookMutation.isPending ? 'Gerando Presente...' : 'Gerar Talão de Cupons'}
              </button>
            </form>
          ) : (
            <div className="home-success">
              <div className="home-success-icon">🎉</div>
              <h2 className="home-success-title">Talão criado!</h2>
              <p className="home-success-desc">
                Copie o link abaixo e envie para quem vai ganhar o presente:
              </p>
              <div className="home-link-box" onClick={handleCopy}>
                {generatedLink}
              </div>
              <p className="home-copy-hint">{copied ? '✓ Link copiado!' : 'Clique para copiar'}</p>
              <div className="home-actions">
                <button
                  onClick={() => navigate(`/book/${generatedLink.split('/').pop()}`)}
                  className="home-btn-dark"
                >
                  Visualizar Tela
                </button>
                <button
                  onClick={() => {
                    setGeneratedLink('');
                    setTitle('');
                    setDescription('');
                    setCoupons([{ title: '', description: '' }]);
                  }}
                  className="home-btn-outline"
                >
                  Criar Outro
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
