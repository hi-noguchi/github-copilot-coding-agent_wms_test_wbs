from app.models.location import Location
from .data_service import DataService
import os

# Singleton pattern for service
_location_service = None

def get_location_service() -> DataService[Location]:
    """Get location service singleton instance"""
    global _location_service
    
    if _location_service is None:
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        data_file = os.path.join(base_dir, 'data', 'locations.json')
        _location_service = DataService[Location](data_file, Location)
        
    return _location_service