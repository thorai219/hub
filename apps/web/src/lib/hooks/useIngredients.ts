import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ingredientsApi,
  type CreateIngredientDto,
  type UpdateIngredientDto,
} from "@/lib/api/ingredients";

// Query keys
export const ingredientKeys = {
  all: ["ingredients"],
  byRestaurant: (restaurantId: string) => [...ingredientKeys.all, restaurantId],
  detail: (restaurantId: string, ingredientId: string) => [
    ...ingredientKeys.byRestaurant(restaurantId),
    ingredientId,
  ],
};

// Get all ingredients for a restaurant
export function useIngredients(restaurantId: string) {
  return useQuery({
    queryKey: ingredientKeys.byRestaurant(restaurantId),
    queryFn: () => ingredientsApi.getAll(restaurantId),
    enabled: !!restaurantId,
  });
}

// Get single ingredient
export function useIngredient(restaurantId: string, ingredientId: string) {
  return useQuery({
    queryKey: ingredientKeys.detail(restaurantId, ingredientId),
    queryFn: () => ingredientsApi.getById(restaurantId, ingredientId),
    enabled: !!restaurantId && !!ingredientId,
  });
}

// Create ingredient
export function useCreateIngredient(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateIngredientDto) =>
      ingredientsApi.create(restaurantId, data),
    onSuccess: () => {
      // Invalidate and refetch ingredients list
      queryClient.invalidateQueries({
        queryKey: ingredientKeys.byRestaurant(restaurantId),
      });
    },
  });
}

// Update ingredient
export function useUpdateIngredient(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ingredientId,
      data,
    }: {
      ingredientId: string;
      data: UpdateIngredientDto;
    }) => ingredientsApi.update(restaurantId, ingredientId, data),
    onSuccess: (updatedIngredient) => {
      // Invalidate list
      queryClient.invalidateQueries({
        queryKey: ingredientKeys.byRestaurant(restaurantId),
      });
      // Update cache for single ingredient
      queryClient.setQueryData(
        ingredientKeys.detail(restaurantId, updatedIngredient.id),
        updatedIngredient,
      );
    },
  });
}

// Delete ingredient
export function useDeleteIngredient(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ingredientId: string) =>
      ingredientsApi.delete(restaurantId, ingredientId),
    onSuccess: (_, ingredientId) => {
      // Remove from cache
      queryClient.invalidateQueries({
        queryKey: ingredientKeys.byRestaurant(restaurantId),
      });
      queryClient.removeQueries({
        queryKey: ingredientKeys.detail(restaurantId, ingredientId),
      });
    },
  });
}
