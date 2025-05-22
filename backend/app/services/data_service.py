import json
from pathlib import Path
from typing import List, Dict, Any, Optional, TypeVar, Generic, Type
import uuid
from datetime import datetime
from pydantic import BaseModel

T = TypeVar('T', bound=BaseModel)

class DataService(Generic[T]):
    """Base service for JSON file data access"""
    
    def __init__(self, file_path: str, model_class: Type[T]):
        self.file_path = Path(file_path)
        self.model_class = model_class
        
    def _load_data(self) -> List[Dict[str, Any]]:
        """Load data from JSON file"""
        if not self.file_path.exists():
            return []
        
        with open(self.file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
            
    def _save_data(self, data: List[Dict[str, Any]]) -> None:
        """Save data to JSON file"""
        with open(self.file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2, default=str)
            
    def get_all(self) -> List[T]:
        """Get all items"""
        data = self._load_data()
        return [self.model_class(**item) for item in data]
    
    def get_by_id(self, id: str) -> Optional[T]:
        """Get item by ID"""
        data = self._load_data()
        for item in data:
            if item.get('id') == id:
                return self.model_class(**item)
        return None
    
    def create(self, item_data: Dict[str, Any]) -> T:
        """Create new item"""
        data = self._load_data()
        
        # Generate ID if not provided
        if 'id' not in item_data:
            item_data['id'] = f"{self.model_class.__name__[0]}{uuid.uuid4().hex[:6].upper()}"
            
        data.append(item_data)
        self._save_data(data)
        
        return self.model_class(**item_data)
    
    def update(self, id: str, item_data: Dict[str, Any]) -> Optional[T]:
        """Update item by ID"""
        data = self._load_data()
        
        for i, item in enumerate(data):
            if item.get('id') == id:
                data[i] = {**item, **item_data}
                self._save_data(data)
                return self.model_class(**data[i])
                
        return None
    
    def delete(self, id: str) -> bool:
        """Delete item by ID"""
        data = self._load_data()
        initial_len = len(data)
        
        data = [item for item in data if item.get('id') != id]
        
        if len(data) < initial_len:
            self._save_data(data)
            return True
            
        return False
        
    def search(self, query: Dict[str, Any]) -> List[T]:
        """Search items by attributes"""
        data = self._load_data()
        results = []
        
        for item in data:
            match = True
            for key, value in query.items():
                if key not in item or item[key] != value:
                    match = False
                    break
            
            if match:
                results.append(self.model_class(**item))
                
        return results