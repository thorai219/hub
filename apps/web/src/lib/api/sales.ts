import { apiClient } from './client';
import type { SalesRecord } from '@repo/types';

export interface CreateSalesRecordDto {
  menuItemId: string;
  quantity: number;
  totalPrice: number;
  soldAt: string | Date;
}

export interface UpdateSalesRecordDto extends Partial<CreateSalesRecordDto> {}

// API Response Types
interface SalesRecordsResponse {
  salesRecords: SalesRecord[];
}

interface SalesRecordResponse {
  salesRecord: SalesRecord;
}

export const salesApi = {
  getAll: async (restaurantId: string): Promise<SalesRecord[]> => {
    const response = await apiClient.get<SalesRecordsResponse>(`/restaurants/${restaurantId}/sales`);
    return response.data.salesRecords;
  },

  getById: async (restaurantId: string, salesRecordId: string): Promise<SalesRecord> => {
    const response = await apiClient.get<SalesRecordResponse>(
      `/restaurants/${restaurantId}/sales/${salesRecordId}`
    );
    return response.data.salesRecord;
  },

  create: async (restaurantId: string, data: CreateSalesRecordDto): Promise<SalesRecord> => {
    const response = await apiClient.post<SalesRecordResponse>(`/restaurants/${restaurantId}/sales`, data);
    return response.data.salesRecord;
  },

  update: async (restaurantId: string, salesRecordId: string, data: UpdateSalesRecordDto): Promise<SalesRecord> => {
    const response = await apiClient.put<SalesRecordResponse>(
      `/restaurants/${restaurantId}/sales/${salesRecordId}`,
      data
    );
    return response.data.salesRecord;
  },

  delete: async (restaurantId: string, salesRecordId: string): Promise<void> => {
    await apiClient.delete(`/restaurants/${restaurantId}/sales/${salesRecordId}`);
  },
};
