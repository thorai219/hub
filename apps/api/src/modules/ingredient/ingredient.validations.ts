import { z } from 'zod';
import type { IngredientUnit, IngredientCategory } from '@repo/types';

const ingredientUnits: [IngredientUnit, ...IngredientUnit[]] = [
  'LBS', 'OZ', 'KG', 'G', 'GALLON', 'LITER', 'ML', 'COUNT', 'CUP', 'TBSP', 'TSP'
];

const ingredientCategories: [IngredientCategory, ...IngredientCategory[]] = [
  'PROTEIN', 'PRODUCE', 'PANTRY', 'SAUCE', 'DAIRY', 'SPICE', 'OTHER'
];

export const createIngredientSchema = z.object({
  name: z.string().min(1, 'Ingredient name is required'),
  unit: z.enum(ingredientUnits),
  pricePerUnit: z.number().positive('Price must be positive'),
  category: z.enum(ingredientCategories),
  supplier: z.string().optional(),
});

export const updateIngredientSchema = z.object({
  name: z.string().min(1, 'Ingredient name is required').optional(),
  unit: z.enum(ingredientUnits).optional(),
  pricePerUnit: z.number().positive('Price must be positive').optional(),
  category: z.enum(ingredientCategories).optional(),
  supplier: z.string().optional(),
});

export type CreateIngredientInput = z.infer<typeof createIngredientSchema>;
export type UpdateIngredientInput = z.infer<typeof updateIngredientSchema>;
