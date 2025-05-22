from app.models.product import Product
from .data_service import DataService
import os

# Singleton pattern for service
_product_service = None

def get_product_service() -> DataService[Product]:
    """Get product service singleton instance"""
    global _product_service
    
    if _product_service is None:
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        data_file = os.path.join(base_dir, 'data', 'products.json')
        _product_service = DataService[Product](data_file, Product)
        
    return _product_service