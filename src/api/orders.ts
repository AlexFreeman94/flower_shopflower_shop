import { api, USE_MOCK, delay } from './client';
import type { OrderPayload, OrderResponse } from './types';

export const ordersApi = {
  // total передаётся только для мок-режима;
  // в бою сумму считает сервер (см. контракт)
  create: async (
    payload: OrderPayload,
    total: number,
  ): Promise<OrderResponse> => {
    if (USE_MOCK) {
      await delay(600);
      return {
        id: Math.floor(1000 + Math.random() * 9000),
        status: 'created',
        total,
        created_at: new Date().toISOString(),
      };
    }
    const { data } = await api.post<OrderResponse>('/api/orders', payload);
    return data;
  },
};
