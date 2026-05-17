import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { Plus, Trash2, Gift } from 'lucide-react';

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

  // Mutation para disparar o POST de criação
  const createBookMutation = useMutation({
    mutationFn: async () => {
      const payload = { title, description, coupons: coupons.filter(c => c.title) };
      const { data } = await apiClient.post<{ slug: string }>('/coupon-books', payload);
      return data.slug;
    },
    onSuccess: (slug) => {
      // Gera o link completo baseado na URL atual
      setGeneratedLink(`${window.location.origin}/book/${slug}`);
    }
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center justify-center py-12">
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 w-full max-w-md">
        <header className="text-center mb-6">
          <div className="bg-pink-100 p-3 rounded-full inline-block mb-2 text-pink-500">
            <Gift size={28} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Criar Talão Digital</h1>
          <p className="text-gray-500 text-sm mt-1">Monte um presente inesquecível e personalizado</p>
        </header>

        {!generatedLink ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Título do Talão</label>
              <input
                type="text"
                required
                placeholder="Ex: Aniversário da Mamãe"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição curta</label>
              <textarea
                placeholder="Ex: Um presente cheio de mimos e carinho..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 h-20 resize-none"
              />
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">Cupons Adicionados</label>
                <button
                  type="button"
                  onClick={handleAddCoupon}
                  className="flex items-center gap-1 text-xs font-bold text-pink-500 hover:text-pink-600 transition"
                >
                  <Plus size={14} /> Adicionar Cupom
                </button>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {coupons.map((coupon, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-xl border border-gray-100 relative space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Título do Cupom (Ex: Vale Jantar)"
                      value={coupon.title}
                      onChange={(e) => handleCouponChange(index, 'title', e.target.value)}
                      className="w-full bg-white px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-400"
                    />
                    <input
                      type="text"
                      placeholder="Descrição (Ex: Válido no restaurante X)"
                      value={coupon.description}
                      onChange={(e) => handleCouponChange(index, 'description', e.target.value)}
                      className="w-full bg-white px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-400"
                    />
                    {coupons.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCoupon(index)}
                        className="absolute top-1 right-2 text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={createBookMutation.isPending}
              className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition active:scale-98 disabled:bg-gray-300"
            >
              {createBookMutation.isPending ? 'Gerando Presente...' : 'Gerar Talão de Cupons'}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="text-green-500 font-semibold text-sm flex flex-col items-center gap-1">
              🎉 Talão criado com sucesso!
            </div>
            <p className="text-gray-600 text-sm">Copie o link seguro abaixo e envie para quem vai ganhar o presente:</p>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs font-mono break-all select-all text-gray-700">
              {generatedLink}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/book/${generatedLink.split('/').pop()}`)}
                className="w-full bg-gray-800 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-gray-900 transition"
              >
                Visualizar Tela
              </button>
              <button
                onClick={() => setGeneratedLink('')}
                className="w-full bg-gray-100 text-gray-600 font-bold py-2.5 rounded-xl text-sm hover:bg-gray-200 transition"
              >
                Criar Outro
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}