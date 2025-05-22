from fastapi import APIRouter, HTTPException, status
from typing import List

from app.models.transaction import Transaction, TransactionCreate, TransactionType
from app.services.transaction_service import get_transaction_service

router = APIRouter(
    prefix="/transactions",
    tags=["transactions"]
)

@router.get("/", response_model=List[Transaction])
async def get_transactions():
    """Get all transactions"""
    return get_transaction_service().get_all()

@router.get("/product/{product_id}", response_model=List[Transaction])
async def get_transactions_by_product(product_id: str):
    """Get transactions by product ID"""
    return get_transaction_service().search({"product_id": product_id})

@router.get("/type/{transaction_type}", response_model=List[Transaction])
async def get_transactions_by_type(transaction_type: TransactionType):
    """Get transactions by type"""
    return get_transaction_service().search({"type": transaction_type})

@router.get("/{transaction_id}", response_model=Transaction)
async def get_transaction(transaction_id: str):
    """Get transaction by ID"""
    transaction = get_transaction_service().get_by_id(transaction_id)
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Transaction with ID {transaction_id} not found"
        )
    return transaction

@router.post("/", response_model=Transaction, status_code=status.HTTP_201_CREATED)
async def create_transaction(transaction: TransactionCreate):
    """Create a new transaction"""
    return get_transaction_service().create(transaction.model_dump())

@router.delete("/{transaction_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_transaction(transaction_id: str):
    """Delete a transaction"""
    success = get_transaction_service().delete(transaction_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Transaction with ID {transaction_id} not found"
        )
    return None