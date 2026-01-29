import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantsApi, type CreateRestaurantDto, type UpdateRestaurantDto } from '@/lib/api/restaurants';

export const restaurantKeys = {
  all: ['restaurants'] as const,
  detail: (restaurantId: string) => [...restaurantKeys.all, restaurantId] as const,
};

export function useRestaurants() {
  return useQuery({
    queryKey: restaurantKeys.all,
    queryFn: () => restaurantsApi.getAll(),
  });
}

export function useRestaurant(restaurantId: string) {
  return useQuery({
    queryKey: restaurantKeys.detail(restaurantId),
    queryFn: () => restaurantsApi.getById(restaurantId),
    enabled: !!restaurantId,
  });
}

export function useCreateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRestaurantDto) => restaurantsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.all });
    },
  });
}

export function useUpdateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ restaurantId, data }: { restaurantId: string; data: UpdateRestaurantDto }) =>
      restaurantsApi.update(restaurantId, data),
    onSuccess: (updatedRestaurant) => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.all });
      queryClient.setQueryData(restaurantKeys.detail(updatedRestaurant.id), updatedRestaurant);
    },
  });
}

export function useDeleteRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (restaurantId: string) => restaurantsApi.delete(restaurantId),
    onSuccess: (_, restaurantId) => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.all });
      queryClient.removeQueries({ queryKey: restaurantKeys.detail(restaurantId) });
    },
  });
}
