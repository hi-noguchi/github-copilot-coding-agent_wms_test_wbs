from fastapi import APIRouter, HTTPException, status
from typing import List

from app.models.inventory import Inventory, InventoryCreate, InventoryUpdate
from app.services.inventory_service import get_inventory_service

router = APIRouter(
    prefix="/inventory",
    tags=["inventory"]
)

@router.get("/", response_model=List[Inventory])
async def get_inventory_items():
    """Get all inventory items"""
    return get_inventory_service().get_all()

@router.get("/product/{product_id}", response_model=List[Inventory])
async def get_inventory_by_product(product_id: str):
    """Get inventory by product ID"""
    return get_inventory_service().search({"product_id": product_id})

@router.get("/location/{location_id}", response_model=List[Inventory])
async def get_inventory_by_location(location_id: str):
    """Get inventory by location ID"""
    return get_inventory_service().search({"location_id": location_id})

@router.get("/{inventory_id}", response_model=Inventory)
async def get_inventory_item(inventory_id: str):
    """Get inventory item by ID"""
    inventory = get_inventory_service().get_by_id(inventory_id)
    if not inventory:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Inventory item with ID {inventory_id} not found"
        )
    return inventory

@router.post("/", response_model=Inventory, status_code=status.HTTP_201_CREATED)
async def create_inventory_item(inventory: InventoryCreate):
    """Create a new inventory item"""
    return get_inventory_service().create(inventory.model_dump())

@router.put("/{inventory_id}", response_model=Inventory)
async def update_inventory_item(inventory_id: str, inventory: InventoryUpdate):
    """Update an inventory item"""
    updated = get_inventory_service().update(inventory_id, {k: v for k, v in inventory.model_dump().items() if v is not None})
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Inventory item with ID {inventory_id} not found"
        )
    return updated

@router.delete("/{inventory_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_inventory_item(inventory_id: str):
    """Delete an inventory item"""
    success = get_inventory_service().delete(inventory_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Inventory item with ID {inventory_id} not found"
        )
    return None