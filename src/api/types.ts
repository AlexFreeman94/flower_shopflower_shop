export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  in_stock: boolean;
}

export interface OrderItem {
  product_id: number;
  quantity: number;
}

export interface OrderPayload {
  customer_name: string;
  phone: string;
  address: string;
  delivery_date: string;
  delivery_time: string;
  comment: string;
  items: OrderItem[];
}

export interface OrderResponse {
  id: number;
  status: string;
  total: number;
  created_at: string;
}
