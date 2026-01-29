import { apiClient } from "./client";
import type { MenuItem } from "@repo/types";

export interface CreateMenuItemDto {
  name: string;
  description?: string;
  sellingPrice: number;
  recipeId: string;
  isActive?: boolean;
}

export interface UpdateMenuItemDto extends Partial<CreateMenuItemDto> {}

export const menuItemsApi = {
  getAll: async (restaurantId: string) => {
    const response = await apiClient.get<MenuItem[]>(
      `/restaurants/${restaurantId}/menu-items`,
    );
    return response.data;
  },

  getById: async (restaurantId: string, menuItemId: string) => {
    const response = await apiClient.get<MenuItem>(
      `/restaurants/${restaurantId}/menu-items/${menuItemId}`,
    );
    return response.data;
  },

  create: async (restaurantId: string, data: CreateMenuItemDto) => {
    const response = await apiClient.post<MenuItem>(
      `/restaurants/${restaurantId}/menu-items`,
      data,
    );
    return response.data;
  },

  update: async (
    restaurantId: string,
    menuItemId: string,
    data: UpdateMenuItemDto,
  ) => {
    const response = await apiClient.put<MenuItem>(
      `/restaurants/${restaurantId}/menu-items/${menuItemId}`,
      data,
    );
    return response.data;
  },

  delete: async (restaurantId: string, menuItemId: string): Promise<void> => {
    await apiClient.delete(
      `/restaurants/${restaurantId}/menu-items/${menuItemId}`,
    );
  },
};
