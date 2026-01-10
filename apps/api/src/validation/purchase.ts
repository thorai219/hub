import { z } from 'zod';

const purchaseItemSchema = z.object({
  ingredientId: z.string().min(1, 'Ingredient ID is required'),
  quantity: z.number().positive('Quantity must be positive'),
  price: z.number().positive('Price must be positive'),
});

export const createPurchaseSchema = z.object({
  supplier: z.string().min(1, 'Supplier is required'),
  invoiceNo: z.string().optional(),
  totalAmount: z.number().positive('Total amount must be positive'),
  purchasedAt: z.string().datetime().optional(), // ISO date string
  notes: z.string().optional(),
  items: z.array(purchaseItemSchema).min(1, 'At least one item is required'),
});

export const updatePurchaseSchema = z.object({
  supplier: z.string().min(1, 'Supplier is required').optional(),
  invoiceNo: z.string().optional(),
  totalAmount: z.number().positive('Total amount must be positive').optional(),
  purchasedAt: z.string().datetime().optional(),
  notes: z.string().optional(),
  // Note: items are not updatable through this endpoint
});

export type CreatePurchaseInput = z.infer<typeof createPurchaseSchema>;
export type UpdatePurchaseInput = z.infer<typeof updatePurchaseSchema>;
export type PurchaseItemInput = z.infer<typeof purchaseItemSchema>;
