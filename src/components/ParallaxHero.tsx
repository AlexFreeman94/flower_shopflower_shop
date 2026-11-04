import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function ParallaxHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900"
      style={{ perspective: '1000px' }}
    >
      {/* СЛОЙ 1: ФОНОВАЯ КАРТИНКА (движется медленнее всех) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out"
        style={{
          backgroundImage: 'url(/image/buket_tsvety_kompozitsiia_137663_300x168.jpg)',
          transform: `translateZ(-100px) scale(1.3) translateX(${mousePosition.x * -30}px) translateY(${mousePosition.y * -30}px)`,
        }}
      />

      {/* СЛОЙ 2: ЗАТЕМНЕНИЕ */}
      <div className="absolute inset-0 bg-black/60" />

      {/* СЛОЙ 3: Розовое свечение */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out pointer-events-none"
        style={{
          transform: `translateZ(-50px) scale(1.1) translateX(${mousePosition.x * -15}px) translateY(${mousePosition.y * -15}px)`,
        }}
      >
        <div className="w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[120px]" />
      </div>

      {/* СЛОЙ 4: Текст и кнопка (выдвинуты вперёд) */}
      <div
        className="relative z-10 text-center text-white px-4 transition-transform duration-100 ease-out"
        style={{
          transform: `translateZ(50px) translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)`,
        }}
      >
        <span className="inline-block py-1 px-4 rounded-full bg-white/10 border border-white/20 text-pink-200 text-sm font-semibold mb-6 backdrop-blur-md">
          🌸 Бесплатная доставка от 3000 ₽
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
          Дарите эмоции, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            а не просто цветы
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow-md">
          Свежие авторские букеты с доставкой за 2 часа.
          Соберём уникальную композицию под любое событие.
        </p>
        <button
          onClick={() => navigate('/catalog')}
          className="px-10 py-4 bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold rounded-2xl shadow-xl shadow-pink-500/30 transition-all hover:scale-105 active:scale-95"
        >
          Выбрать букет
        </button>
      </div>

      {/* СЛОЙ 5: Блики на переднем плане (движутся быстрее всех) */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-100 ease-out"
        style={{
          transform: `translateZ(100px) translateX(${mousePosition.x * 40}px) translateY(${mousePosition.y * 40}px)`,
        }}
      >
        <div className="absolute top-20 left-20 w-24 h-24 bg-pink-400/30 rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute bottom-32 right-32 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>
    </div>
  );
}