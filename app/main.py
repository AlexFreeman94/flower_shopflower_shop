from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.database import engine, Base, async_session
# ВАЖНО: Импортируем модели, чтобы SQLAlchemy «увидела» их и создала таблицы в БД!
from app.models import ProductModel, OrderModel
from app.routers import products, orders
from sqlalchemy import select


# Настраиваем Lifespan (жизненный цикл) сервера
@asynccontextmanager
async def lifespan(_app: FastAPI):
    # 1. Автоматически создаем таблицы в базе данных при старте
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # 2. Наполняем базу базовыми цветами, если она пустая
    async with async_session() as session:
        result = await session.execute(select(ProductModel))
        if not result.scalars().first():
            session.add_all([
                ProductModel(name="Роза Красная", price=250.0, stock=100),
                ProductModel(name="Букет Пионов", price=5000.0, stock=10)
            ])
            await session.commit()

    yield  # В этой точке сервер запущен и готов отвечать на запросы клиентов


# Инициализируем приложение
app = FastAPI(title="Flower Shop API", lifespan=lifespan)

# Подключаем маршруты нашего цветочного магазина
app.include_router(products.router)
app.include_router(orders.router)

@app.get("/", summary="Главная страница API")
async def read_root():
    return {
        "status": "success",
        "message": "Добро пожаловать в API цветочного магазина! 🌸",
        "documentation": "Перейдите на /docs для тестирования эндпоинтов"
    }