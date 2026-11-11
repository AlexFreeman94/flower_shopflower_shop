import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CartPage } from './pages/CartPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { useCart } from './store/cart';

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  const count = useCart((state) =>
    state.items.reduce((sum, i) => sum + i.quantity, 0),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-pink-600 flex items-center gap-2"
          >
            🌸 FlowersShop
          </Link>
          <nav className="flex gap-6 items-center">
            <Link
              to="/catalog"
              className="text-gray-600 hover:text-pink-600 font-medium transition-colors"
            >
              Каталог
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-pink-600 font-medium transition-colors"
            >
              Корзина
              {count > 0 && (
                <span className="absolute -top-2 -right-4 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {count}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-900 text-gray-400 pt-12 pb-6 mt-auto">
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* О магазине */}
    <div>
      <p className="text-2xl font-bold text-white mb-4">🌸 FlowersShop</p>
      <p className="text-sm leading-relaxed">
        Дарим эмоции с 2020 года. Свежие авторские букеты с доставкой по всему городу.
      </p>
    </div>

    {/* Покупателям */}
    <div>
      <p className="text-white font-semibold mb-4">Покупателям</p>
      <ul className="space-y-2 text-sm">
        <li>
          <Link to="/catalog" className="hover:text-pink-400 transition-colors">Каталог</Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-pink-400 transition-colors">Корзина</Link>
        </li>
        <li><span className="cursor-pointer hover:text-pink-400 transition-colors">Доставка и оплата</span></li>
      </ul>
    </div>

    {/* Контакты */}
    <div>
      <p className="text-white font-semibold mb-4">Контакты</p>
      <ul className="space-y-2 text-sm">
        <li>📞 +7 (999) 123-45-67</li>
        <li>✉️ hello@flowersshop.ru</li>
        <li>📍 г. Москва, ул. Цветочная, 1</li>
      </ul>
    </div>

    {/* Режим работы */}
    <div>
      <p className="text-white font-semibold mb-4">Режим работы</p>
      <ul className="space-y-2 text-sm">
        <li>Ежедневно: 8:00 — 22:00</li>
        <li>Доставка: круглосуточно</li>
        <li>Приём заказов онлайн: 24/7</li>
      </ul>
    </div>
  </div>

  <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
    © 2026 FlowersShop. Все права защищены.
  </div>
</footer>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
          </Routes>
        </Layout>
        <Toaster position="bottom-right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
