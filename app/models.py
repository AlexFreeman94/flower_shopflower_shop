from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
# КРИТИЧЕСКИ ВАЖНО: Импортируем тот самый Base из database.py
from app.database import Base

class ProductModel(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=True)
    price: Mapped[float] = mapped_column(nullable=False)
    stock: Mapped[int] = mapped_column(default=0)


class OrderModel(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    customer_phone: Mapped[str] = mapped_column(nullable=False)
    delivery_address: Mapped[str] = mapped_column(nullable=False)
    delivery_time: Mapped[datetime] = mapped_column(nullable=False)
    is_anonymous: Mapped[bool] = mapped_column(default=False)
    total_price: Mapped[float] = mapped_column(nullable=False)
    status: Mapped[str] = mapped_column(default="pending")
