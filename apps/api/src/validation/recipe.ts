import { z } from 'zod';

export const recipeIngredientSchema = z.object({
  ingredientId: z.string().min(1, 'Ingredient ID is required'),
  quantity: z.number().positive('Quantity must be positive'),
  cost: z.number().nonnegative('Cost must be non-negative'),
});

export const createRecipeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  servings: z.number().int().positive('Servings must be a positive integer').default(1),
  totalCost: z.number().nonnegative('Total cost must be non-negative'),
  ingredients: z.array(recipeIngredientSchema).min(1, 'At least one ingredient is required'),
});

export const updateRecipeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long').optional(),
  description: z.string().max(500, 'Description is too long').optional(),
  servings: z.number().int().positive('Servings must be a positive integer').optional(),
  totalCost: z.number().nonnegative('Total cost must be non-negative').optional(),
});

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>;
export type RecipeIngredientInput = z.infer<typeof recipeIngredientSchema>;
