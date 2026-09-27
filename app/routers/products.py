from unittest import result

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models import ProductModel
from app.schemas import ProductResponse


router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=list[ProductResponse])
async def get_products(db: AsyncSession = Depends(get_db)):
    results = await db.execute(select(ProductModel).where(ProductModel.stock > 0))
    return results.scalars().all()
