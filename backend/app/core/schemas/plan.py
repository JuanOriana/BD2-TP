from pydantic import BaseModel
from typing import Union

class Plan(BaseModel):
    name: str
    price: float
    expiration_days: int
    max_url_count: int

class ExtPlan(Plan):
    id: Union[str, None] = None