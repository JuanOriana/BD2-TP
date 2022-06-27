from fastapi import APIRouter, HTTPException
from app.core.schemas.plan import Plan
router = APIRouter()

@router.get("", response_model=list[Plan], status_code=200)
async def get_all_plans():
    return []

@router.get("/{plan_id}", response_model=list[Plan], status_code=200)
async def get_all_plans(plan_id : int):
    return {"plan_id": plan_id, "expiration_days": 30, "max_url_count": 5000} 