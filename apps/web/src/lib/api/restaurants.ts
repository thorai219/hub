import { apiClient } from "./client";
import type { Restaurant } from "@repo/types";

export interface CreateRestaurantDto {
  name: string;
  address?: string;
  phone?: string;
  cuisineType?: string;
}

export interface UpdateRestaurantDto extends Partial<CreateRestaurantDto> {}

export const restaurantsApi = {
  getAll: async (): Promise<Restaurant[]> => {
    const response = await apiClient.get<Restaurant[]>("/restaurants");
    return response.data;
  },

  getById: async (restaurantId: string): Promise<Restaurant> => {
    const response = await apiClient.get<Restaurant>(
      `/restaurants/${restaurantId}`,
    );
    return response.data;
  },

  create: async (data: CreateRestaurantDto): Promise<Restaurant> => {
    const response = await apiClient.post<Restaurant>("/restaurants", data);
    return response.data;
  },

  update: async (
    restaurantId: string,
    data: UpdateRestaurantDto,
  ): Promise<Restaurant> => {
    const response = await apiClient.put<Restaurant>(
      `/restaurants/${restaurantId}`,
      data,
    );
    return response.data;
  },

  delete: async (restaurantId: string): Promise<void> => {
    await apiClient.delete(`/restaurants/${restaurantId}`);
  },
};
