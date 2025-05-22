from pydantic import BaseModel, Field
from typing import Optional

class LocationBase(BaseModel):
    name: str
    type: str
    address: str
    capacity: int

class LocationCreate(LocationBase):
    pass

class LocationUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    address: Optional[str] = None
    capacity: Optional[int] = None

class Location(LocationBase):
    id: str
    
    class Config:
        from_attributes = True