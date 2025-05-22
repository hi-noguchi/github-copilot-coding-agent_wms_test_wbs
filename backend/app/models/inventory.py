from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class InventoryBase(BaseModel):
    product_id: str
    location_id: str
    quantity: int
    last_updated: datetime

class InventoryCreate(InventoryBase):
    pass

class InventoryUpdate(BaseModel):
    product_id: Optional[str] = None
    location_id: Optional[str] = None
    quantity: Optional[int] = None
    last_updated: Optional[datetime] = None

class Inventory(InventoryBase):
    id: str
    
    class Config:
        from_attributes = True