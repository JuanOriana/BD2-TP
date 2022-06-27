from fastapi import APIRouter, HTTPException
from datetime import datetime
import validators
from app.core.schemas.url import *

router = APIRouter()

@router.post("", response_model=URLInfo, status_code=201)
async def create_url(payload: URL):
    if not validators.url(payload.target_url):
        raise HTTPException(status_code=400, detail="The provided URL is not valid")
    response_object = {
        "target_url": payload.target_url,
        "title": payload.title,
        "short_url": "T3S71N6",
        "is_active": True,
        "clicks": 0,
        "creation_date": datetime.now(),
        "owner": {"username": "mpavan"}
    }
    return response_object