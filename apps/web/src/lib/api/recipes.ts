import { apiClient } from "./client";
import type { Recipe } from "@repo/types";

export interface CreateRecipeDto {
  name: string;
  description?: string;
  servings: number;
  ingredients: Array<{
    ingredientId: string;
    quantity: number;
  }>;
}

export interface UpdateRecipeDto extends Partial<
  Omit<CreateRecipeDto, "ingredients">
> {
  ingredients?: Array<{
    ingredientId: string;
    quantity: number;
  }>;
}

export const recipesApi = {
  getAll: async (restaurantId: string) => {
    const response = await apiClient.get<Recipe[]>(
      `/restaurants/${restaurantId}/recipes`,
    );
    return response.data;
  },

  getById: async (restaurantId: string, recipeId: string) => {
    const response = await apiClient.get<Recipe>(
      `/restaurants/${restaurantId}/recipes/${recipeId}`,
    );
    return response.data;
  },

  create: async (restaurantId: string, data: CreateRecipeDto) => {
    const response = await apiClient.post<Recipe>(
      `/restaurants/${restaurantId}/recipes`,
      data,
    );
    return response.data;
  },

  update: async (
    restaurantId: string,
    recipeId: string,
    data: UpdateRecipeDto,
  ) => {
    const response = await apiClient.put<Recipe>(
      `/restaurants/${restaurantId}/recipes/${recipeId}`,
      data,
    );
    return response.data;
  },

  delete: async (restaurantId: string, recipeId: string): Promise<void> => {
    await apiClient.delete(`/restaurants/${restaurantId}/recipes/${recipeId}`);
  },
};
