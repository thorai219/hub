import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryApi, type CreateInventoryCountDto, type UpdateInventoryCountDto } from '@/lib/api/inventory';

export const inventoryKeys = {
  all: ['inventory'] as const,
  byRestaurant: (restaurantId: string) => [...inventoryKeys.all, restaurantId] as const,
  detail: (restaurantId: string, inventoryCountId: string) =>
    [...inventoryKeys.byRestaurant(restaurantId), inventoryCountId] as const,
};

export function useInventory(restaurantId: string) {
  return useQuery({
    queryKey: inventoryKeys.byRestaurant(restaurantId),
    queryFn: () => inventoryApi.getAll(restaurantId),
    enabled: !!restaurantId,
  });
}

export function useInventoryCount(restaurantId: string, inventoryCountId: string) {
  return useQuery({
    queryKey: inventoryKeys.detail(restaurantId, inventoryCountId),
    queryFn: () => inventoryApi.getById(restaurantId, inventoryCountId),
    enabled: !!restaurantId && !!inventoryCountId,
  });
}

export function useCreateInventoryCount(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInventoryCountDto) => inventoryApi.create(restaurantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.byRestaurant(restaurantId) });
    },
  });
}

export function useUpdateInventoryCount(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ inventoryCountId, data }: { inventoryCountId: string; data: UpdateInventoryCountDto }) =>
      inventoryApi.update(restaurantId, inventoryCountId, data),
    onSuccess: (updatedInventoryCount) => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.byRestaurant(restaurantId) });
      queryClient.setQueryData(inventoryKeys.detail(restaurantId, updatedInventoryCount.id), updatedInventoryCount);
    },
  });
}

export function useDeleteInventoryCount(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inventoryCountId: string) => inventoryApi.delete(restaurantId, inventoryCountId),
    onSuccess: (_, inventoryCountId) => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.byRestaurant(restaurantId) });
      queryClient.removeQueries({ queryKey: inventoryKeys.detail(restaurantId, inventoryCountId) });
    },
  });
}
