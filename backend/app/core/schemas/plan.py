from pydantic import BaseModel, Field as PydanticField
from app.core.models.object_id import PyObjectId
from typing import Union
from bson.objectid import ObjectId

class Plan(BaseModel):
    name: str
    price: float
    expiration_days: int
    max_url_count: int
    member_count: Union[int, None] = None

class ExtPlan(Plan):
    id: PyObjectId = PydanticField(default_factory=PyObjectId, alias="_id")
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}