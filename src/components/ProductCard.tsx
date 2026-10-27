import type { Product } from '../api/products';
import { useCart } from '../store/cart';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);

  const handleAdd = () => {
    addItem(product);
    toast.success(`"${product.name}" добавлен в корзину!`);
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col">
        <img
          src={
            product.image_url ||
            'https://placehold.co/400x300/fce7f3/db2777?text=Цветы'
          }
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        <div className="p-4 flex flex-col flex-grow">
          <span className="text-xs font-semibold text-pink-600 uppercase">
            {product.category}
          </span>
          <h3 className="text-lg font-bold text-gray-800 mt-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-grow">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-gray-900">
              {product.price} ₽
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAdd();
              }}
              disabled={!product.in_stock}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                product.in_stock
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {product.in_stock ? 'В корзину' : 'Нет в наличии'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
