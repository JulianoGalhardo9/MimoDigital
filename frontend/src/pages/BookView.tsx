import { useParams } from 'react-router-dom';
import { useCouponBook } from '../hooks/useCouponBook';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket } from 'lucide-react';
import type { CouponItem } from '../types';

export default function BookView() {
  const { slug } = useParams<{ slug: string }>();
  const { bookQuery, claimMutation } = useCouponBook(slug || '');

  if (bookQuery.isLoading) return <div className="flex justify-center p-10 font-medium text-gray-500">Carregando mimos...</div>;
  if (bookQuery.isError) return <div className="text-center p-10 text-red-500 font-medium">Talão não encontrado. 😢</div>;

  const book = bookQuery.data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-gray-50 p-4 pb-20 select-none">
      <header className="text-center my-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold text-gray-800 tracking-tight"
        >
          {book?.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 mt-2 text-sm max-w-xs mx-auto"
        >
          {book?.description}
        </motion.p>
      </header>

      <div className="grid gap-6 max-w-md mx-auto">
        {book?.coupons.map((coupon: CouponItem, index: number) => (
          <motion.div
            key={coupon.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-6 rounded-2xl border-2 bg-white shadow-sm overflow-hidden transition-all ${
              coupon.isClaimed ? 'border-green-300 bg-gray-50/50' : 'border-dashed border-pink-200'
            }`}
          >
            {/* Efeito de Carimbo (Aparece com rotação e escala agressiva) */}
            <AnimatePresence>
              {coupon.isClaimed && (
                <motion.div
                  initial={{ scale: 3, opacity: 0, rotate: -45 }}
                  animate={{ scale: 1, opacity: 1, rotate: -12 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                  className="absolute right-6 top-4 border-4 border-green-500 text-green-500 font-black text-xs uppercase px-3 py-1 rounded-lg tracking-widest z-10 bg-white shadow-md pointer-events-none"
                >
                  ✓ RESGATADO
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-start">
              <div className={coupon.isClaimed ? 'opacity-50 line-through text-gray-400' : ''}>
                <h3 className="text-xl font-bold text-gray-800">{coupon.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{coupon.description}</p>
              </div>
              {!coupon.isClaimed && (
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Ticket className="text-pink-500 h-7 w-7" />
                </motion.div>
              )}
            </div>

            <button
              onClick={() => claimMutation.mutate(coupon.id)}
              disabled={coupon.isClaimed || claimMutation.isPending}
              className={`mt-5 w-full py-3 rounded-xl font-bold text-sm tracking-wide shadow-sm transition-all ${
                coupon.isClaimed
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:opacity-95 active:scale-[0.98]'
              }`}
            >
              {coupon.isClaimed ? 'Aproveite o seu presente!' : 'Resgatar Cupom'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}