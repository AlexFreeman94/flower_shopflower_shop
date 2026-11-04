const features = [
  {
    icon: '🚚',
    title: 'Доставка за 2 часа',
    text: 'Привезём букет в течение 2 часов после оформления заказа по всему городу.',
  },
  {
    icon: '🌹',
    title: 'Всегда свежие цветы',
    text: 'Поставки 3 раза в неделю напрямую с плантаций Эквадора и Голландии.',
  },
  {
    icon: '💐',
    title: 'Ручная сборка',
    text: 'Каждый букет собирает профессиональный флорист с опытом от 5 лет.',
  },
  {
    icon: '📸',
    title: 'Фото перед отправкой',
    text: 'Пришлём фото готового букета в мессенджер перед доставкой.',
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Почему выбирают нас
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          Мы любим своё дело и делаем всё, чтобы каждый букет приносил радость
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-pink-50 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}