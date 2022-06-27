from pydantic import BaseModel
class Plan(BaseModel):
    expiration_days: int
    max_url_count: int