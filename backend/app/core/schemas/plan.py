from pydantic import BaseModel
class Plan(BaseModel):
    plan_id: int
    expiration_days: int
    max_url_count: int