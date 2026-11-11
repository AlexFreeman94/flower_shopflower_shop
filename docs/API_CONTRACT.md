# API-контракт FlowersShop (v1)

Base URL (dev): `http://127.0.0.1:8000`
Формат: JSON, UTF-8. Именование полей — **snake_case**.
Авторизация в v1 отсутствует (в v2 — Bearer-токен).

## 1. Товары

### GET /api/products

Ответ `200`:

```json
[
  {
    "id": 1,
    "name": "Нежность утра",
    "description": "Пионы, эустома и эвкалипт в крафтовой упаковке",
    "price": 4500,
    "image_url": "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    "category": "Сборные",
    "in_stock": true
  }
]
```

### GET /api/products/{id}

- `200` — объект товара (структура выше)
- `404` — `{ "detail": "Товар не найден" }`

## 2. Заказы

### POST /api/orders

Запрос:

```json
{
  "customer_name": "Иван Иванов",
  "phone": "+7 999 123-45-67",
  "address": "Москва, ул. Пушкина, 1",
  "delivery_date": "2026-11-15",
  "delivery_time": "10:00-12:00",
  "comment": "Позвонить за час",
  "items": [
    { "product_id": 1, "quantity": 2 },
    { "product_id": 4, "quantity": 1 }
  ]
}
```

Ответ `201`:

```json
{
  "id": 101,
  "status": "created",
  "total": 13500,
  "created_at": "2026-11-11T12:00:00Z"
}
```

Ошибки:

- `422` — ошибка валидации (стандартное тело FastAPI)
- `409` — товар из корзины отсутствует на складе (опционально)

> ⚠️ Важно: `total` считает **сервер** по своим ценам, клиенту верить нельзя.

## 3. v2 (после введения авторизации)

- `POST /api/auth/register` `{ email, password, name }` → `201 { token }`
- `POST /api/auth/login` `{ email, password }` → `200 { token }`
- `GET /api/me` → `200` профиль пользователя
- `GET /api/orders` (Bearer) → `200` история заказов пользователя

## Соглашения

- Ошибки: HTTP-статус + `{ "detail": "текст" }`
- Деньги: целые числа в рублях (без float)
- Даты: ISO 8601 (`YYYY-MM-DD`, `YYYY-MM-DDTHH:MM:SSZ`)
- Пагинация в v1 не нужна (каталог < 100 позиций)
