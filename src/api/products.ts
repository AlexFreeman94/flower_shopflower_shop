import { api } from './client';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  in_stock: boolean;
};

export const productsApi = {
  getAll: () => api.get<Product[]>('/api/products').then((res) => res.data),
};
