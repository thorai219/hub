import { apiClient } from './client';
import type { Purchase } from '@repo/types';

export interface CreatePurchaseDto {
  supplier: string;
  invoiceNo?: string;
  purchasedAt: string | Date;
  notes?: string;
  items: Array<{
    ingredientId: string;
    quantity: number;
    price: number;
  }>;
}

export interface UpdatePurchaseDto extends Partial<CreatePurchaseDto> {}

// API Response Types
interface PurchasesResponse {
  purchases: Purchase[];
}

interface PurchaseResponse {
  purchase: Purchase;
}

export const purchasesApi = {
  getAll: async (restaurantId: string): Promise<Purchase[]> => {
    const response = await apiClient.get<PurchasesResponse>(`/restaurants/${restaurantId}/purchases`);
    return response.data.purchases;
  },

  getById: async (restaurantId: string, purchaseId: string): Promise<Purchase> => {
    const response = await apiClient.get<PurchaseResponse>(
      `/restaurants/${restaurantId}/purchases/${purchaseId}`
    );
    return response.data.purchase;
  },

  create: async (restaurantId: string, data: CreatePurchaseDto): Promise<Purchase> => {
    const response = await apiClient.post<PurchaseResponse>(`/restaurants/${restaurantId}/purchases`, data);
    return response.data.purchase;
  },

  update: async (restaurantId: string, purchaseId: string, data: UpdatePurchaseDto): Promise<Purchase> => {
    const response = await apiClient.put<PurchaseResponse>(
      `/restaurants/${restaurantId}/purchases/${purchaseId}`,
      data
    );
    return response.data.purchase;
  },

  delete: async (restaurantId: string, purchaseId: string): Promise<void> => {
    await apiClient.delete(`/restaurants/${restaurantId}/purchases/${purchaseId}`);
  },
};
