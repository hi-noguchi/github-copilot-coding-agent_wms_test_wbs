from pydantic import BaseModel, Field
from typing import Optional

class ProductBase(BaseModel):
    name: str
    description: str
    category: str
    unit: str
    price: float
    supplier_id: str

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    unit: Optional[str] = None
    price: Optional[float] = None
    supplier_id: Optional[str] = None

class Product(ProductBase):
    id: str
    
    class Config:
        from_attributes = True