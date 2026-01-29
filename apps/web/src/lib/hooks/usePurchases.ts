import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { purchasesApi, type CreatePurchaseDto, type UpdatePurchaseDto } from '@/lib/api/purchases';

export const purchaseKeys = {
  all: ['purchases'] as const,
  byRestaurant: (restaurantId: string) => [...purchaseKeys.all, restaurantId] as const,
  detail: (restaurantId: string, purchaseId: string) =>
    [...purchaseKeys.byRestaurant(restaurantId), purchaseId] as const,
};

export function usePurchases(restaurantId: string) {
  return useQuery({
    queryKey: purchaseKeys.byRestaurant(restaurantId),
    queryFn: () => purchasesApi.getAll(restaurantId),
    enabled: !!restaurantId,
  });
}

export function usePurchase(restaurantId: string, purchaseId: string) {
  return useQuery({
    queryKey: purchaseKeys.detail(restaurantId, purchaseId),
    queryFn: () => purchasesApi.getById(restaurantId, purchaseId),
    enabled: !!restaurantId && !!purchaseId,
  });
}

export function useCreatePurchase(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePurchaseDto) => purchasesApi.create(restaurantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchaseKeys.byRestaurant(restaurantId) });
    },
  });
}

export function useUpdatePurchase(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ purchaseId, data }: { purchaseId: string; data: UpdatePurchaseDto }) =>
      purchasesApi.update(restaurantId, purchaseId, data),
    onSuccess: (updatedPurchase) => {
      queryClient.invalidateQueries({ queryKey: purchaseKeys.byRestaurant(restaurantId) });
      queryClient.setQueryData(purchaseKeys.detail(restaurantId, updatedPurchase.id), updatedPurchase);
    },
  });
}

export function useDeletePurchase(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (purchaseId: string) => purchasesApi.delete(restaurantId, purchaseId),
    onSuccess: (_, purchaseId) => {
      queryClient.invalidateQueries({ queryKey: purchaseKeys.byRestaurant(restaurantId) });
      queryClient.removeQueries({ queryKey: purchaseKeys.detail(restaurantId, purchaseId) });
    },
  });
}
