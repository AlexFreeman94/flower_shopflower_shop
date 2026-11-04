import { mockProducts } from './mockData';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  in_stock: boolean;
};

// Имитация задержки сети (чтобы было видно состояние загрузки)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    await delay(400);
    return mockProducts;
  },

  getById: async (id: number): Promise<Product | undefined> => {
    await delay(300);
    return mockProducts.find(p => p.id === id);
  },
};