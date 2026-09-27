from pydantic import BaseModel, Field
from datetime import datetime

class ProductResponse(BaseModel):
    id: int
    name: str
    description: str | None
    price: float
    stock: int

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    customer_phone: str = Field(..., examples=["+79991234567"])
    delivery_address: str = Field(..., examples=["ул. Мира, д. 12"])
    delivery_time: datetime = Field(..., examples=["2026-03-08T14:00:00"])
    is_anonymous: bool = False
    product_id: int
    quantity: int = Field(..., gt=0, examples=[1])  # Строка полностью закрыта

