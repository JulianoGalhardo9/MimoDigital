import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import type { CouponBook } from '../types';

export const useCouponBook = (slug: string) => {
  const queryClient = useQueryClient();

  // Query para buscar os dados
  const bookQuery = useQuery({
    queryKey: ['couponBook', slug],
    queryFn: async () => {
      const { data } = await apiClient.get<CouponBook>(`/coupon-books/${slug}`);
      return data;
    },
    enabled: !!slug,
  });

  // Mutation para resgatar o cupom
  const claimMutation = useMutation({
    mutationFn: async (couponId: string) => {
      await apiClient.post(`/coupon-books/coupons/${couponId}/claim`);
    },
    onSuccess: () => {
      // Invalida o cache para atualizar a tela automaticamente
      queryClient.invalidateQueries({ queryKey: ['couponBook', slug] });
    },
  });

  return { bookQuery, claimMutation };
};