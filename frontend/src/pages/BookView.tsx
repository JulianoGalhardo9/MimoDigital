import { useParams } from 'react-router-dom';
import { useCouponBook } from '../hooks/useCouponBook';
import { motion } from 'framer-motion';
import { Ticket, CheckCircle2 } from 'lucide-react';
import type { CouponItem } from '../types'; // Importando o tipo explicitamente
 // Importando o tipo explicitamente

export default function BookView() {
  const { slug } = useParams<{ slug: string }>();
  const { bookQuery, claimMutation } = useCouponBook(slug || '');

  if (bookQuery.isLoading) return <div className="flex justify-center p-10">Carregando mimos...</div>;
  if (bookQuery.isError) return <div className="text-center p-10 text-red-500">Talão não encontrado. 😢</div>;

  const book = bookQuery.data;

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <header className="text-center my-8">
        <h1 className="text-3xl font-bold text-gray-800">{book?.title}</h1>
        <p className="text-gray-600 mt-2">{book?.description}</p>
      </header>

      <div className="grid gap-4 max-w-md mx-auto">
        {book?.coupons.map((coupon: CouponItem) => ( // Tipagem adicionada aqui
          <motion.div
            key={coupon.id}
            whileHover={{ scale: 1.02 }}
            className={`relative p-6 rounded-2xl border-2 bg-white shadow-sm overflow-hidden ${
              coupon.isClaimed ? 'border-green-200 opacity-80' : 'border-dashed border-primary/30'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{coupon.title}</h3>
                <p className="text-gray-600 mt-1">{coupon.description}</p>
              </div>
              {coupon.isClaimed ? (
                <CheckCircle2 className="text-green-500 h-8 w-8" />
              ) : (
                <Ticket className="text-primary h-8 w-8" />
              )}
            </div>

            <button
              onClick={() => claimMutation.mutate(coupon.id)}
              disabled={coupon.isClaimed || claimMutation.isPending}
              className={`mt-4 w-full py-3 rounded-xl font-bold transition-all ${
                coupon.isClaimed
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-opacity-90 active:scale-95'
              }`}
            >
              {coupon.isClaimed ? 'Já Resgatado!' : 'Resgatar Cupom'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}