import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products';
import { useCart } from '../store/cart';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCart((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(Number(id)),
    enabled: !!id,
  });

  if (isLoading)
    return <div className="p-10 text-center text-gray-500">Загрузка...</div>;
  if (error || !product) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 mb-4">Товар не найден</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
        >
          Вернуться в каталог
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`"${product.name}" × ${quantity} добавлен в корзину!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Хлебные крошки */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-pink-600">
          Каталог
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm p-6">
        {/* Изображение */}
        <div className="overflow-hidden rounded-xl">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Информация */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-pink-600 uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            {product.name}
          </h1>
          <p className="text-gray-600 mt-4 flex-grow">{product.description}</p>

          <div className="mt-6">
            <span className="text-4xl font-bold text-gray-900">
              {product.price} ₽
            </span>
          </div>

          {/* Выбор количества */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-gray-700 font-medium">Количество:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg"
              >
                −
              </button>
              <span className="w-8 text-center font-semibold text-lg">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Кнопки */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className={`flex-grow px-6 py-4 rounded-xl font-semibold transition ${
                product.in_stock
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {product.in_stock ? 'Добавить в корзину' : 'Нет в наличии'}
            </button>
          </div>

          {/* Статус наличия */}
          <div className="mt-4 flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-500'}`}
            ></span>
            <span className="text-sm text-gray-600">
              {product.in_stock ? 'В наличии' : 'Нет в наличии'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
