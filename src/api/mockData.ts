import type { Product } from './products';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Букет из 15 роз',
    description:
      'Нежные розовые розы с эвкалиптом. Идеальный подарок на день рождения.',
    price: 3500,
    image_url:
      'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500',
    category: 'Розы',
    in_stock: true,
  },
  {
    id: 2,
    name: 'Весенние тюльпаны',
    description:
      'Яркий букет из 25 разноцветных тюльпанов. Символ весны и радости.',
    price: 2200,
    image_url:
      'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500',
    category: 'Тюльпаны',
    in_stock: true,
  },
  {
    id: 3,
    name: 'Белые пионы',
    description:
      'Роскошный букет из белых пионов. Нежность и элегантность в каждом лепестке.',
    price: 4800,
    image_url:
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500',
    category: 'Пионы',
    in_stock: true,
  },
  {
    id: 4,
    name: 'Полевой микс',
    description:
      'Сборный букет из полевых цветов: ромашки, васильки, колокольчики.',
    price: 1800,
    image_url:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500',
    category: 'Сборные',
    in_stock: true,
  },
  {
    id: 5,
    name: 'Красные розы "Страсть"',
    description:
      'Классический букет из 25 красных роз. Выражение любви и страсти.',
    price: 5200,
    image_url:
      'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=500',
    category: 'Розы',
    in_stock: true,
  },
  {
    id: 6,
    name: 'Лавандовое настроение',
    description: 'Букет из лаванды и сухоцветов. Долго стоит и приятно пахнет.',
    price: 2600,
    image_url:
      'https://images.unsplash.com/photo-1499946981954-e7f4b234d7fa?w=500',
    category: 'Сухоцветы',
    in_stock: false,
  },
  {
    id: 7,
    name: 'Солнечные подсолнухи',
    description:
      'Яркий букет из подсолнухов. Дарит тепло и хорошее настроение.',
    price: 2900,
    image_url:
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500',
    category: 'Сборные',
    in_stock: true,
  },
  {
    id: 8,
    name: 'Нежность (микс)',
    description:
      'Букет из белых и розовых цветов: розы, хризантемы, альстромерии.',
    price: 3200,
    image_url:
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500',
    category: 'Сборные',
    in_stock: true,
  },
];
