import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../store/cart';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart, setLastOrder } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    comment: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Если корзина пуста — редирект в каталог
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Корзина пуста</h2>
        <p className="text-gray-500 mb-6">
          Добавьте товары перед оформлением заказа
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Убираем ошибку при вводе
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Введите имя получателя';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Некорректный номер телефона';
    }
    if (!formData.address.trim()) newErrors.address = 'Введите адрес доставки';
    if (!formData.date) newErrors.date = 'Выберите дату доставки';
    if (!formData.time) newErrors.time = 'Выберите время доставки';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Проверьте правильность заполнения формы');
      return;
    }

    // Генерируем номер заказа 
    const orderId = Math.floor(100000 + Math.random() * 900000).toString();

    // Сохраняем заказ в store
    setLastOrder({
      id: orderId,
      items: [...items],
      total: getTotal(),
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      date: formData.date,
      time: formData.time,
      comment: formData.comment,
      createdAt: new Date().toISOString(),
    });

    // Очищаем корзину
    clearCart();

    toast.success('Заказ успешно оформлен! 🌸');
    navigate('/order-success');
  };

  // Минимальная дата — сегодня
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Хлебные крошки */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-pink-600">
          Каталог
        </Link>
        <span className="mx-2">/</span>
        <Link to="/cart" className="hover:text-pink-600">
          Корзина
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Оформление</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Оформление заказа
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Форма */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Данные получателя
            </h2>

            {/* Имя */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Имя получателя *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Иван Иванов"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.name ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Телефон */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Телефон *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (999) 123-45-67"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.phone ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Адрес */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Адрес доставки *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="г. Москва, ул. Цветочная, д. 1, кв. 10"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.address ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Доставка
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Дата */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дата *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.date ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-pink-500`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              {/* Время */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Время *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.time ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-pink-500`}
                />
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Комментарий */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Комментарий к заказу
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={3}
                placeholder="Например: позвонить за час до доставки"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-pink-500 text-white rounded-xl font-semibold text-lg hover:bg-pink-600 transition"
          >
            Оформить заказ на {getTotal()} ₽
          </button>
        </form>

        {/* Сводка заказа */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Ваш заказ
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                  />
                  <div className="flex-grow">
                    <p className="font-medium text-gray-800 text-sm">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {quantity} шт. × {product.price} ₽
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {quantity * product.price} ₽
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Итого:</span>
                <span className="text-2xl font-bold text-gray-900">
                  {getTotal()} ₽
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
