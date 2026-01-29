import { apiClient } from "./client";
import type { Ingredient } from "@repo/types";

export interface CreateIngredientDto {
  name: string;
  unit: string;
  pricePerUnit: number;
  category: string;
  supplier?: string;
}

export interface UpdateIngredientDto extends Partial<CreateIngredientDto> {}

export const ingredientsApi = {
  getAll: async (restaurantId: string): Promise<Ingredient[]> => {
    const response = await apiClient.get<Ingredient[]>(
      `/restaurants/${restaurantId}/ingredients`,
    );
    return response.data;
  },

  getById: async (
    restaurantId: string,
    ingredientId: string,
  ): Promise<Ingredient> => {
    const response = await apiClient.get<Ingredient>(
      `/restaurants/${restaurantId}/ingredients/${ingredientId}`,
    );
    return response.data;
  },

  create: async (
    restaurantId: string,
    data: CreateIngredientDto,
  ): Promise<Ingredient> => {
    const response = await apiClient.post<Ingredient>(
      `/restaurants/${restaurantId}/ingredients`,
      data,
    );
    return response.data;
  },

  update: async (
    restaurantId: string,
    ingredientId: string,
    data: UpdateIngredientDto,
  ): Promise<Ingredient> => {
    const response = await apiClient.put<Ingredient>(
      `/restaurants/${restaurantId}/ingredients/${ingredientId}`,
      data,
    );
    return response.data;
  },

  delete: async (restaurantId: string, ingredientId: string): Promise<void> => {
    await apiClient.delete(
      `/restaurants/${restaurantId}/ingredients/${ingredientId}`,
    );
  },
};
