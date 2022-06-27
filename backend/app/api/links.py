from fastapi import APIRouter, HTTPException
from datetime import datetime
import validators
from app.core.schemas.url import *

router = APIRouter()

def gen_mock_url(target, title):
    mock_url = {
        "target_url": target,
        "title": title,
        "short_url": "T3S71N6",
        "is_active": True,
        "clicks": 0,
        "creation_date": datetime.now(),
        "owner": {"username": "mpavan"}
    }

# Add middleware checks

@router.post("", response_model=URLInfo, status_code=201)
async def shorten_url(payload: URL):
    if not validators.url(payload.target_url):
        raise HTTPException(status_code=400, detail="The provided URL is not valid")
    return gen_mock_url(payload.target_url, payload.title)

@router.get("", response_model=list[URLInfo], status_code=200)
async def get_all_shortened_urls():
    return [gen_mock_url("aa", "bb")]

@router.delete("/{short_key}", status_code=204)
async def delete_link_by_short_key(short_key: str):
    return

@router.get("/{short_key}", response_model=URLInfo, status_code=200)
async def get_link_by_short_key(short_key: str):
    return gen_mock_url("aa", "bb")

@router.put("/{short_key}", response_model=URLInfo, status_code=200)
async def modify_link_by_short_key(short_key: str, new_short_key: str):
    return gen_mock_url("aa", "bb")
