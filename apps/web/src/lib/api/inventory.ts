import { apiClient } from "./client";
import type { InventoryCount } from "@repo/types";

export interface CreateInventoryCountDto {
  ingredientId: string;
  quantity: number;
  countedAt: string | Date;
  countedBy?: string;
  notes?: string;
}

export interface UpdateInventoryCountDto extends Partial<CreateInventoryCountDto> {}

export const inventoryApi = {
  getAll: async (restaurantId: string) => {
    const response = await apiClient.get<InventoryCount[]>(
      `/restaurants/${restaurantId}/inventory`,
    );
    return response.data;
  },

  getById: async (restaurantId: string, inventoryCountId: string) => {
    const response = await apiClient.get<InventoryCount>(
      `/restaurants/${restaurantId}/inventory/${inventoryCountId}`,
    );
    return response.data;
  },

  create: async (restaurantId: string, data: CreateInventoryCountDto) => {
    const response = await apiClient.post<InventoryCount>(
      `/restaurants/${restaurantId}/inventory`,
      data,
    );
    return response.data;
  },

  update: async (
    restaurantId: string,
    inventoryCountId: string,
    data: UpdateInventoryCountDto,
  ) => {
    const response = await apiClient.put<InventoryCount>(
      `/restaurants/${restaurantId}/inventory/${inventoryCountId}`,
      data,
    );
    return response.data;
  },

  delete: async (
    restaurantId: string,
    inventoryCountId: string,
  ): Promise<void> => {
    await apiClient.delete(
      `/restaurants/${restaurantId}/inventory/${inventoryCountId}`,
    );
  },
};
