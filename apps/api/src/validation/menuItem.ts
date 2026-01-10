import { z } from 'zod';

export const createMenuItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  recipeId: z.string().min(1, 'Recipe ID is required'),
  sellingPrice: z.number().positive('Selling price must be positive'),
  foodCostPercent: z.number().min(0, 'Food cost percent must be non-negative').max(100, 'Food cost percent cannot exceed 100'),
  isActive: z.boolean().default(true),
});

export const updateMenuItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long').optional(),
  description: z.string().max(500, 'Description is too long').optional(),
  recipeId: z.string().min(1, 'Recipe ID is required').optional(),
  sellingPrice: z.number().positive('Selling price must be positive').optional(),
  foodCostPercent: z.number().min(0, 'Food cost percent must be non-negative').max(100, 'Food cost percent cannot exceed 100').optional(),
  isActive: z.boolean().optional(),
});

export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof updateMenuItemSchema>;
