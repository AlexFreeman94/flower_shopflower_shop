import { api, USE_MOCK, delay } from './client';
import { mockProducts } from './mockData';
import type { Product } from './types';

export type { Product };

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    if (USE_MOCK) {
      await delay(500);
      return mockProducts;
    }
    const { data } = await api.get<Product[]>('/api/products');
    return data;
  },

  getById: async (id: number): Promise<Product> => {
    if (USE_MOCK) {
      await delay(300);
      const product = mockProducts.find((p) => p.id === id);
      if (!product) throw new Error('Товар не найден');
      return product;
    }
    const { data } = await api.get<Product>(`/api/products/${id}`);
    return data;
  },
};
