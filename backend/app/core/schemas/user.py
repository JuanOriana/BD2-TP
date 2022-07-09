from pydantic import BaseModel
from typing import Union
from app.core.schemas.plan import Plan

class User(BaseModel):
    username: str
    email: Union[str, None] = None
    plan: Plan
    is_admin: bool = False

class UserInDB(User):
    hashed_password: str