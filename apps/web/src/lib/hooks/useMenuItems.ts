import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { menuItemsApi, type CreateMenuItemDto, type UpdateMenuItemDto } from '@/lib/api/menuItems';

export const menuItemKeys = {
  all: ['menuItems'] as const,
  byRestaurant: (restaurantId: string) => [...menuItemKeys.all, restaurantId] as const,
  detail: (restaurantId: string, menuItemId: string) =>
    [...menuItemKeys.byRestaurant(restaurantId), menuItemId] as const,
};

export function useMenuItems(restaurantId: string) {
  return useQuery({
    queryKey: menuItemKeys.byRestaurant(restaurantId),
    queryFn: () => menuItemsApi.getAll(restaurantId),
    enabled: !!restaurantId,
  });
}

export function useMenuItem(restaurantId: string, menuItemId: string) {
  return useQuery({
    queryKey: menuItemKeys.detail(restaurantId, menuItemId),
    queryFn: () => menuItemsApi.getById(restaurantId, menuItemId),
    enabled: !!restaurantId && !!menuItemId,
  });
}

export function useCreateMenuItem(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMenuItemDto) => menuItemsApi.create(restaurantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuItemKeys.byRestaurant(restaurantId) });
    },
  });
}

export function useUpdateMenuItem(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuItemId, data }: { menuItemId: string; data: UpdateMenuItemDto }) =>
      menuItemsApi.update(restaurantId, menuItemId, data),
    onSuccess: (updatedMenuItem) => {
      queryClient.invalidateQueries({ queryKey: menuItemKeys.byRestaurant(restaurantId) });
      queryClient.setQueryData(menuItemKeys.detail(restaurantId, updatedMenuItem.id), updatedMenuItem);
    },
  });
}

export function useDeleteMenuItem(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (menuItemId: string) => menuItemsApi.delete(restaurantId, menuItemId),
    onSuccess: (_, menuItemId) => {
      queryClient.invalidateQueries({ queryKey: menuItemKeys.byRestaurant(restaurantId) });
      queryClient.removeQueries({ queryKey: menuItemKeys.detail(restaurantId, menuItemId) });
    },
  });
}
