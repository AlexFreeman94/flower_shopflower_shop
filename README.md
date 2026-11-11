# FlowersShop — Интернет-магазин цветов

Современный e-commerce проект с адаптивным дизайном, 3D-эффектами и готовой интеграцией с бэкендом.

**Деплой:** [flowersshop.netlify.app](https://flowersshop.netlify.app) *(замени на свою ссылку)*

---

##  Скриншоты

| Главная с параллаксом | Каталог | Корзина |
|---|---|---|
| ![Главная](screenshots/home.png) | ![Каталог](screenshots/catalog.png) | ![Корзина](screenshots/cart.png) |

| Оформление заказа | Экран успеха | Мобильная версия |
|---|---|---|
| ![Checkout](screenshots/checkout.png) | ![Success](screenshots/success.png) | ![Mobile](screenshots/mobile.png) |

---

##  Ключевые фичи

###  UI/UX
- **3D Parallax Hero** — кастомный эффект параллакса на чистом CSS/JS (без библиотек)
- **Адаптивная вёрстка** — mobile-first, корректно работает от 360px до 4K
- **Скелетоны загрузки** — плавные пульсирующие заглушки вместо текста "Загрузка..."
- **Toast-уведомления** — мгновенная обратная связь при добавлении в корзину
- **Хлебные крошки** — навигация: Главная → Каталог → Букет
- **Кастомная 404** — красивая страница ошибки с навигацией
- **Блокировка товаров** — визуальная индикация отсутствующих позиций

###  E-commerce функционал
- Полный цикл покупки: каталог → карточка → корзина → checkout → подтверждение
- Валидация формы заказа (regex для телефона, ограничение даты доставки)
- Сохранение корзины в localStorage (переживает перезагрузку)
- Динамический пересчёт суммы

###  Архитектура
- **API-контракт** — документация для бэкенда (`docs/API_CONTRACT.md`)
- **Mock-first подход** — разработка без ожидания бэкенда
- **Переключатель Mock/Real** — интеграция через одну переменную окружения
- **Задел под авторизацию** — axios-интерцептор готов к JWT-токенам

---

## Технологический стек

### Frontend
- **React 18** + **TypeScript** — типизированные компоненты
- **Vite 5** — быстрая сборка и HMR
- **Tailwind CSS v3** — utility-first стилизация
- **React Router v6** — клиентский роутинг
- **Zustand** — глобальное состояние (корзина с persist)
- **TanStack Query** — управление серверными данными и кеширование
- **Axios** — HTTP-клиент с интерцепторами
- **react-hot-toast** — уведомления

### Инструменты
- **Git** + **GitHub** — версионирование, ветки, Pull Requests
- **VS Code** — основной редактор
- **Netlify** — деплой и хостинг

---

##  Структура проекта
flower_shop/
├── public/                    # Статические файлы (background.svg)
├── src/
│   ├── api/                   #  API-слой и контракты
│   │   ├── client.ts          # Axios-клиент с интерцепторами
│   │   ├── types.ts           # TypeScript-интерфейсы (Product, Order)
│   │   ├── products.ts        # API для товаров (mock/real switch)
│   │   ├── orders.ts          # API для заказов
│   │   └── mockData.ts        # Мок-данные для разработки
│   ├── components/            # Переиспользуемые компоненты
│   │   ├── ParallaxHero.tsx   # 3D-параллакс главный экран
│   │   ├── ProductCard.tsx    # Карточка товара
│   │   └── Footer.tsx         # Футер сайта
│   ├── pages/                 # Страницы приложения
│   │   ├── HomePage.tsx       # Главная (hero + benefits + reviews)
│   │   ├── CatalogPage.tsx    # Каталог товаров
│   │   ├── ProductPage.tsx    # Карточка товара
│   │   ├── CartPage.tsx       # Корзина
│   │   ├── CheckoutPage.tsx   # Оформление заказа
│   │   └── SuccessPage.tsx    # Экран подтверждения
│   ├── store/                 # Zustand-сторы
│   │   └── cart.ts            # Корзина с persist в localStorage
│   ├── App.tsx                # Роутинг и layout
│   ├── main.tsx               # Точка входа
│   └── index.css              # Глобальные стили + Tailwind
├── docs/
│   └── API_CONTRACT.md        # Контракт API для бэкенда
├── .env                       # Переменные окружения (не коммитится)
├── .env.example               # Шаблон переменных окружения
├── vite.config.ts             # Конфигурация Vite
├── tailwind.config.cjs        # Конфигурация Tailwind CSS
└── package.json               # Зависимости и скрипты

###  Ключевые файлы для понимания архитектуры

| Файл | Зачем смотреть |
|------|----------------|
| `src/api/client.ts` | Как настроен axios, интерцепторы, переключатель mock/real |
| `src/api/types.ts` | TypeScript-интерфейсы для API (Product, Order) |
| `src/api/products.ts` | Пример работы с mock/real переключателем |
| `src/store/cart.ts` | Zustand-стор с persist (корзина) |
| `src/components/ParallaxHero.tsx` | Кастомный 3D-эффект без библиотек |
| `docs/API_CONTRACT.md` | Документация API для бэкендера |
| `vite.config.ts` | Конфигурация сборки |

---

## Запуск проекта

### Требования
- Node.js 18+ (рекомендуется 22 LTS)
- npm 9+

### Установка и запуск

```bash
# 1. Клонируй репозиторий
git clone https://github.com/ТВОЙ_НИК/flower_shop.git
cd flower_shop

# 2. Установи зависимости
npm install

# 3. Создай файл окружения
cp .env.example .env

# 4. Запусти в режиме разработки
npm run dev
Открой http://localhost:5173
Переключение на реальный бэкенд
Когда бэкенд готов:

    Открой .env
    Измени VITE_USE_MOCK=true на VITE_USE_MOCK=false
    Укажи URL бэкенда: VITE_API_URL=http://127.0.0.1:8000
    Перезапусти npm run dev

Всё! Сайт начнёт работать с реальным API без изменения кода компонентов.
