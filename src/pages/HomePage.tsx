import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products';
import { ProductCard } from '../components/ProductCard';
import { ParallaxHero } from '../components/ParallaxHero';
import { FeaturesSection } from '../components/FeaturesSection';
import { ReviewsSection } from '../components/ReviewsSection';

export function HomePage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  const popularProducts = products?.slice(0, 4) || [];

  return (
    <div>
      <ParallaxHero />

      {/* Популярные букеты */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Популярные букеты</h2>
            <p className="text-gray-500 mt-2">Выбор наших покупателей на этой неделе</p>
          </div>
          <Link
            to="/catalog"
            className="hidden md:block px-6 py-3 border-2 border-pink-500 text-pink-600 rounded-xl font-semibold hover:bg-pink-500 hover:text-white transition"
          >
            Смотреть все
          </Link>
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

        <div className="text-center mt-8 md:hidden">
          <Link
            to="/catalog"
            className="inline-block px-6 py-3 border-2 border-pink-500 text-pink-600 rounded-xl font-semibold"
          >
            Смотреть все
          </Link>
        </div>
      </section>

      <FeaturesSection />
      <ReviewsSection />
    </div>
  );
}