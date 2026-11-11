import axios from 'axios';

// Режим моков: включён по умолчанию, выключается через .env
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000',
  headers: { 'Content-Type': 'application/json' },
});

// Задел на авторизацию: когда появится токен, он подставится сам
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Единая точка логирования ошибок API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      '[API]',
      error?.response?.status ?? 'network',
      error?.message,
    );
    return Promise.reject(error);
  },
);

// Имитация задержки сети для мок-режима
export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
