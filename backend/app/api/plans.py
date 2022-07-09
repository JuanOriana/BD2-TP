from fastapi import APIRouter, HTTPException, status
from app.core.schemas.plan import Plan, ExtPlan
from app.database import plan_collection
from bson.objectid import ObjectId

router = APIRouter()

def get_standard_plan():
    return plan_collection.find_one({"name": "Standard"})

@router.get(
        "", 
        response_model = list[ExtPlan], 
        status_code = status.HTTP_200_OK
    )
async def get_all_plans():
    plans = []
    for plan in plan_collection.find():
        ext_plan = ExtPlan(**plan)
        ext_plan.id = str(plan["_id"])
        plans.append(ext_plan)
    return plans

@router.get(
        "/{plan_id}", 
        response_model = Plan, 
        status_code = status.HTTP_200_OK)
async def get_all_plans(
        plan_id : str
    ):
    plan = plan_collection.find_one({"_id": ObjectId(plan_id)})
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    return Plan(**plan)