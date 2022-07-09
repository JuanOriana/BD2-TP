from fastapi import APIRouter, HTTPException
from app.core.schemas.plan import Plan, ExtPlan
from app.database import plan_collection
from bson.objectid import ObjectId

router = APIRouter()

@router.get("", response_model=list[ExtPlan], status_code=200)
async def get_all_plans():
    # get all plans from plan_collection with their corresponding object id and append it to a list
    plans = []
    for plan in plan_collection.find():
        ext_plan = ExtPlan(**plan)
        ext_plan.id = str(plan["_id"])
        plans.append(ext_plan)
    return plans




@router.get("/{plan_id}", response_model=Plan, status_code=200)
async def get_all_plans(plan_id : str):
    plan = plan_collection.find_one({"_id": ObjectId(plan_id)})
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    return Plan(**plan)