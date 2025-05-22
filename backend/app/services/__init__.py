# Import services to make them accessible from the app.services namespace
from .data_service import DataService
from .product_service import get_product_service
from .inventory_service import get_inventory_service
from .location_service import get_location_service
from .transaction_service import get_transaction_service