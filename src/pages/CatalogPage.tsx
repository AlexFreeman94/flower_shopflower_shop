import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products';
import { ProductCard } from '../components/ProductCard';

export function CatalogPage() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  if (isLoading)
    return (
      <div className="p-10 text-center text-gray-500">Загрузка букетов...</div>
    );
  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        Ошибка загрузки. Проверь, запущен ли бэкенд.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Наши букеты</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
