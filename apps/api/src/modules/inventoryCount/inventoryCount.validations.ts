import { z } from 'zod';

export const createInventoryCountSchema = z.object({
  ingredientId: z.string().min(1, 'Ingredient ID is required'),
  quantity: z.number().nonnegative('Quantity must be non-negative'),
  value: z.number().nonnegative('Value must be non-negative'),
  countedAt: z.string().datetime().optional(),
  countedBy: z.string().max(100, 'Counted by is too long').optional(),
  notes: z.string().max(500, 'Notes are too long').optional(),
});

export const updateInventoryCountSchema = z.object({
  ingredientId: z.string().min(1, 'Ingredient ID is required').optional(),
  quantity: z.number().nonnegative('Quantity must be non-negative').optional(),
  value: z.number().nonnegative('Value must be non-negative').optional(),
  countedAt: z.string().datetime().optional(),
  countedBy: z.string().max(100, 'Counted by is too long').optional(),
  notes: z.string().max(500, 'Notes are too long').optional(),
});

export type CreateInventoryCountInput = z.infer<typeof createInventoryCountSchema>;
export type UpdateInventoryCountInput = z.infer<typeof updateInventoryCountSchema>;
