import { useCart } from '../store/cart';
import { useNavigate } from 'react-router-dom';

export function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Корзина пуста</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Корзина</h1>
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        {items.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="flex items-center gap-4 border-b border-gray-100 pb-4"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-20 h-20 rounded-lg object-cover bg-gray-100"
            />
            <div className="flex-grow">
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-pink-600 font-bold">{product.price} ₽</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                −
              </button>
              <span className="w-6 text-center font-medium">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeItem(product.id)}
              className="text-red-500 hover:text-red-700 ml-4 text-xl"
            >
              ✕
            </button>
          </div>
        ))}
        <div className="flex justify-between items-center pt-4">
          <span className="text-xl font-bold">Итого: {getTotal()} ₽</span>
          <button className="px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 font-medium">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}
