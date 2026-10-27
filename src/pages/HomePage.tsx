import { ParallaxHero } from '../components/ParallaxHero';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products';
import { ProductCard } from '../components/ProductCard';

export function HomePage() {
  // Берем только первые 4 товара для главной страницы
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  const popularProducts = products?.slice(0, 4) || [];

  return (
    <div>
      <ParallaxHero />

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Популярные букеты
            </h2>
            <p className="text-gray-500 mt-2">
              Выбор наших покупателей на этой неделе
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-gray-500">Загрузка...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
