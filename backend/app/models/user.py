from pydantic import BaseModel, Field, EmailStr
from typing import Optional

class User(BaseModel):
    id: str
    username: str
    name: str
    email: str
    role: str
    department: str
    
    class Config:
        from_attributes = True