from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models import ProductModel, OrderModel
from app.schemas import OrderCreate

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/orders", status_code=status.HTTP_201_CREATED)
async def create_order(order_data: OrderCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProductModel).where(ProductModel.id == order_data.product_id))
    product = result.scalars().one_or_none()

    if not product:
        raise HTTPException(status_code=404, detail="Товар не найден ")

    if product.stock < order_data.quantity:
        raise HTTPException(status_code=400, detail="Недостаточно цветов на складе")

    total_price = product.price * order_data.quantity
    product.stock -= order_data.quantity


    new_order = OrderModel(
        customer_phone=order_data.customer_phone,
        delivery_address=order_data.delivery_address,
        delivery_time=order_data.delivery_time,
        is_anonymous=order_data.is_anonymous,
        total_price=total_price

    )

    db.add(new_order)
    await db.commit()
    return {"status":"success","order_id":new_order.id}