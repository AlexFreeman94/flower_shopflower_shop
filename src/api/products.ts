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
  // Реальный запрос к твоему FastAPI
  getAll: () => api.get<Product[]>('/api/products').then((res) => res.data),
  getById: (id: number) =>
    api.get<Product>(`/api/products/${id}`).then((res) => res.data),
};
