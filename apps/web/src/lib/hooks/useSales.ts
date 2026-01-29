import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { salesApi, type CreateSalesRecordDto, type UpdateSalesRecordDto } from '@/lib/api/sales';

export const salesKeys = {
  all: ['sales'] as const,
  byRestaurant: (restaurantId: string) => [...salesKeys.all, restaurantId] as const,
  detail: (restaurantId: string, salesRecordId: string) =>
    [...salesKeys.byRestaurant(restaurantId), salesRecordId] as const,
};

export function useSales(restaurantId: string) {
  return useQuery({
    queryKey: salesKeys.byRestaurant(restaurantId),
    queryFn: () => salesApi.getAll(restaurantId),
    enabled: !!restaurantId,
  });
}

export function useSalesRecord(restaurantId: string, salesRecordId: string) {
  return useQuery({
    queryKey: salesKeys.detail(restaurantId, salesRecordId),
    queryFn: () => salesApi.getById(restaurantId, salesRecordId),
    enabled: !!restaurantId && !!salesRecordId,
  });
}

export function useCreateSalesRecord(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSalesRecordDto) => salesApi.create(restaurantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesKeys.byRestaurant(restaurantId) });
    },
  });
}

export function useUpdateSalesRecord(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ salesRecordId, data }: { salesRecordId: string; data: UpdateSalesRecordDto }) =>
      salesApi.update(restaurantId, salesRecordId, data),
    onSuccess: (updatedSalesRecord) => {
      queryClient.invalidateQueries({ queryKey: salesKeys.byRestaurant(restaurantId) });
      queryClient.setQueryData(salesKeys.detail(restaurantId, updatedSalesRecord.id), updatedSalesRecord);
    },
  });
}

export function useDeleteSalesRecord(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (salesRecordId: string) => salesApi.delete(restaurantId, salesRecordId),
    onSuccess: (_, salesRecordId) => {
      queryClient.invalidateQueries({ queryKey: salesKeys.byRestaurant(restaurantId) });
      queryClient.removeQueries({ queryKey: salesKeys.detail(restaurantId, salesRecordId) });
    },
  });
}
