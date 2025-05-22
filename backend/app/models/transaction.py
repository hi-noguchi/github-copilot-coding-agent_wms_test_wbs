from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime

TransactionType = Literal["入庫", "出庫", "移動"]

class TransactionBase(BaseModel):
    type: TransactionType
    product_id: str
    quantity: int
    source_location_id: Optional[str] = None
    destination_location_id: Optional[str] = None
    timestamp: datetime
    user_id: str
    reference_number: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: str
    
    class Config:
        from_attributes = True