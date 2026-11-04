const reviews = [
  {
    name: 'Анна К.',
    date: '2 дня назад',
    rating: 5,
    text: 'Заказывала букет маме на юбилей. Привезли вовремя, букет просто шикарный! Мама была в восторге. Спасибо!',
  },
  {
    name: 'Дмитрий С.',
    date: 'неделю назад',
    rating: 5,
    text: 'Очень удобный сайт, заказал за 5 минут. Прислали фото букета перед доставкой — приятный сюрприз. Жена довольна!',
  },
  {
    name: 'Елена М.',
    date: '2 недели назад',
    rating: 4,
    text: 'Цветы свежие, стояли больше недели. Единственное — хотелось бы больше вариантов пионов. В остальном всё супер.',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-yellow-400 text-lg">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{i <= count ? '★' : '☆'}</span>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Отзывы наших клиентов
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Более 5000 довольных покупателей за последний год
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-xl font-bold text-pink-600">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                </div>
                <Stars count={review.rating} />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}