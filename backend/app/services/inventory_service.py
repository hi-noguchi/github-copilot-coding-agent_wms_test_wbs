from app.models.inventory import Inventory
from .data_service import DataService
import os

# Singleton pattern for service
_inventory_service = None

def get_inventory_service() -> DataService[Inventory]:
    """Get inventory service singleton instance"""
    global _inventory_service
    
    if _inventory_service is None:
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        data_file = os.path.join(base_dir, 'data', 'inventory.json')
        _inventory_service = DataService[Inventory](data_file, Inventory)
        
    return _inventory_service