import { z } from 'zod';

export const createSalesRecordSchema = z.object({
  menuItemId: z.string().min(1, 'Menu item ID is required').optional(),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
  totalPrice: z.number().positive('Total price must be positive'),
  soldAt: z.string().datetime().optional(),
});

export const updateSalesRecordSchema = z.object({
  menuItemId: z.string().min(1, 'Menu item ID is required').optional(),
  quantity: z.number().int().positive('Quantity must be a positive integer').optional(),
  totalPrice: z.number().positive('Total price must be positive').optional(),
  soldAt: z.string().datetime().optional(),
});

export type CreateSalesRecordInput = z.infer<typeof createSalesRecordSchema>;
export type UpdateSalesRecordInput = z.infer<typeof updateSalesRecordSchema>;
