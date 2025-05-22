from fastapi import APIRouter, HTTPException, status
from typing import List

from app.models.location import Location, LocationCreate, LocationUpdate
from app.services.location_service import get_location_service

router = APIRouter(
    prefix="/locations",
    tags=["locations"]
)

@router.get("/", response_model=List[Location])
async def get_locations():
    """Get all locations"""
    return get_location_service().get_all()

@router.get("/{location_id}", response_model=Location)
async def get_location(location_id: str):
    """Get location by ID"""
    location = get_location_service().get_by_id(location_id)
    if not location:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Location with ID {location_id} not found"
        )
    return location

@router.post("/", response_model=Location, status_code=status.HTTP_201_CREATED)
async def create_location(location: LocationCreate):
    """Create a new location"""
    return get_location_service().create(location.model_dump())

@router.put("/{location_id}", response_model=Location)
async def update_location(location_id: str, location: LocationUpdate):
    """Update a location"""
    updated = get_location_service().update(location_id, {k: v for k, v in location.model_dump().items() if v is not None})
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Location with ID {location_id} not found"
        )
    return updated

@router.delete("/{location_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_location(location_id: str):
    """Delete a location"""
    success = get_location_service().delete(location_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Location with ID {location_id} not found"
        )
    return None