import { useNavigate } from 'react-router-dom';
import { useCart } from '../store/cart';
import { useEffect } from 'react';

export function OrderSuccessPage() {
  const navigate = useNavigate();
  const { lastOrder } = useCart();

  // Если нет данных заказа — редирект на главную
  useEffect(() => {
    if (!lastOrder) {
      navigate('/');
    }
  }, [lastOrder, navigate]);

  if (!lastOrder) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        {/* Иконка успеха */}
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Заказ оформлен!
        </h1>
        <p className="text-gray-600 mb-8">
          Спасибо за покупку. Мы свяжемся с вами для подтверждения.
        </p>

        {/* Номер заказа */}
        <div className="bg-pink-50 rounded-xl p-4 mb-8 inline-block">
          <p className="text-sm text-gray-600 mb-1">Номер заказа</p>
          <p className="text-2xl font-bold text-pink-600">#{lastOrder.id}</p>
        </div>

        {/* Детали заказа */}
        <div className="text-left bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Детали заказа
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Получатель:</span>
              <span className="font-medium text-gray-900">
                {lastOrder.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Телефон:</span>
              <span className="font-medium text-gray-900">
                {lastOrder.phone}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Адрес:</span>
              <span className="font-medium text-gray-900 text-right max-w-xs">
                {lastOrder.address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Дата доставки:</span>
              <span className="font-medium text-gray-900">
                {lastOrder.date} в {lastOrder.time}
              </span>
            </div>
            {lastOrder.comment && (
              <div className="flex justify-between">
                <span className="text-gray-600">Комментарий:</span>
                <span className="font-medium text-gray-900 text-right max-w-xs">
                  {lastOrder.comment}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Список товаров */}
        <div className="text-left bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Состав заказа
          </h2>
          <div className="space-y-3">
            {lastOrder.items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-3">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-14 h-14 rounded-lg object-cover bg-white"
                />
                <div className="flex-grow">
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    {quantity} шт. × {product.price} ₽
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  {quantity * product.price} ₽
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
            <span className="text-gray-700 font-medium">Итого:</span>
            <span className="text-2xl font-bold text-gray-900">
              {lastOrder.total} ₽
            </span>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-pink-500 text-white rounded-xl font-medium hover:bg-pink-600 transition"
          >
            Вернуться в каталог
          </button>
        </div>
      </div>
    </div>
  );
}
