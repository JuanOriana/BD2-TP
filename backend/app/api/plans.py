from fastapi import APIRouter, HTTPException, status
from app.core.schemas.plan import Plan, ExtPlan
from app.database import plan_collection, user_collection
from bson.objectid import ObjectId

router = APIRouter()

def get_standard_plan():
    return plan_collection.find_one({"name": "Standard"})

def get_premium_plan():
    return plan_collection.find_one({"name": "Premium"})

@router.get(
        "", 
        response_model = list[ExtPlan], 
        status_code = status.HTTP_200_OK,
        response_model_exclude_none = True
    )
async def get_all_plans():
    plans = list(plan_collection.find({}))
    for plan in plans:
        plan["member_count"] = user_collection.count_documents({"plan.name": plan["name"]})
    return plans
    
    

@router.get(
        "/{plan_id}", 
        response_model = ExtPlan,
        status_code = status.HTTP_200_OK,
        response_model_exclude_none = True)
async def get_all_plans(
        plan_id : str
    ):
    plan = plan_collection.find_one({"_id": ObjectId(plan_id)})
    if not plan:
        raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND, 
                detail = "Plan not found"
            )
    plan["member_count"] = user_collection.count_documents({"plan.name": plan["name"]})
    return plan
