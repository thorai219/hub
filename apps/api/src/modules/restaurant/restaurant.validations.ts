import { z } from 'zod';

export const createRestaurantSchema = z.object({
  name: z.string().min(1, 'Restaurant name is required'),
  address: z.string().optional(),
  phone: z.string().optional(),
  cuisineType: z.string().optional(),
});

export const updateRestaurantSchema = z.object({
  name: z.string().min(1, 'Restaurant name is required').optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  cuisineType: z.string().optional(),
});

export type CreateRestaurantInput = z.infer<typeof createRestaurantSchema>;
export type UpdateRestaurantInput = z.infer<typeof updateRestaurantSchema>;
