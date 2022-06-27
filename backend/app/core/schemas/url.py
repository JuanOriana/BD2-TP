from pydantic import BaseModel
from datetime import date
from app.core.schemas.user import User
from typing import Union
class URLBase(BaseModel):
    target_url: str

class URL(URLBase):
    title: str
    short_url: Union[str, None] = None

class URLInfo(URL):
    short_url: str
    is_active: bool
    clicks: int
    creation_date: date
    owner: User
    

