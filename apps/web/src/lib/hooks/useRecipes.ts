import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recipesApi, type CreateRecipeDto, type UpdateRecipeDto } from '@/lib/api/recipes';

export const recipeKeys = {
  all: ['recipes'] as const,
  byRestaurant: (restaurantId: string) => [...recipeKeys.all, restaurantId] as const,
  detail: (restaurantId: string, recipeId: string) =>
    [...recipeKeys.byRestaurant(restaurantId), recipeId] as const,
};

export function useRecipes(restaurantId: string) {
  return useQuery({
    queryKey: recipeKeys.byRestaurant(restaurantId),
    queryFn: () => recipesApi.getAll(restaurantId),
    enabled: !!restaurantId,
  });
}

export function useRecipe(restaurantId: string, recipeId: string) {
  return useQuery({
    queryKey: recipeKeys.detail(restaurantId, recipeId),
    queryFn: () => recipesApi.getById(restaurantId, recipeId),
    enabled: !!restaurantId && !!recipeId,
  });
}

export function useCreateRecipe(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRecipeDto) => recipesApi.create(restaurantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.byRestaurant(restaurantId) });
    },
  });
}

export function useUpdateRecipe(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ recipeId, data }: { recipeId: string; data: UpdateRecipeDto }) =>
      recipesApi.update(restaurantId, recipeId, data),
    onSuccess: (updatedRecipe) => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.byRestaurant(restaurantId) });
      queryClient.setQueryData(recipeKeys.detail(restaurantId, updatedRecipe.id), updatedRecipe);
    },
  });
}

export function useDeleteRecipe(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: string) => recipesApi.delete(restaurantId, recipeId),
    onSuccess: (_, recipeId) => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.byRestaurant(restaurantId) });
      queryClient.removeQueries({ queryKey: recipeKeys.detail(restaurantId, recipeId) });
    },
  });
}
