from app.models.transaction import Transaction
from .data_service import DataService
import os

# Singleton pattern for service
_transaction_service = None

def get_transaction_service() -> DataService[Transaction]:
    """Get transaction service singleton instance"""
    global _transaction_service
    
    if _transaction_service is None:
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        data_file = os.path.join(base_dir, 'data', 'transactions.json')
        _transaction_service = DataService[Transaction](data_file, Transaction)
        
    return _transaction_service