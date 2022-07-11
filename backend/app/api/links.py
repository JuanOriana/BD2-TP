import validators, random
from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime
from app.core.schemas.url import *
from app.api.users import get_current_user
from app.database import link_collection, redis_db

router = APIRouter()

def get_short_link_owner(short_url):
    link = link_collection.find_one({"short_url": short_url})
    if not link:
        raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND, 
                detail = "Link not found"
            )
    return link["author"]

def generate_short_url():
    short_url = ""
    for i in range(7):
        short_url += chr(ord('a') + random.randint(0, 25))
    return short_url

def populate_redis_link(short_url, long_url, expiration):
    redis_db.set(short_url, long_url)
    redis_db.expire(short_url, expiration)

def populate_mongo_link(short_url, long_url, title, author):
    link = {
        "short_url": short_url,
        "target_url": long_url,
        "title": title,
        "author": author,
        "creation_date": datetime.now(),
        "clicks": 0,
    }
    link_collection.insert_one(link)
    return link

@router.post(
        "", 
        response_model = URLInfo, 
        status_code = status.HTTP_201_CREATED
    )
async def shorten_url(
        payload: URL,
        current_user: User = Depends(get_current_user)
    ):
    if not validators.url(payload.target_url):
        raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST, 
                detail = "The provided URL is not valid"
            )
    if payload.short_url:
        if redis_db.exists(payload.short_url):
            raise HTTPException(
                    status_code = status.HTTP_400_BAD_REQUEST, 
                    detail = "The provided short URL is already in use"
                )
        populate_redis_link(payload.short_url, payload.target_url, current_user["plan"]["expiration_days"] * 86400)
        return populate_mongo_link(payload.short_url, payload.target_url, payload.title, current_user)

    short_url = generate_short_url()
    while redis_db.exists(short_url):
        short_url = generate_short_url()
    print(current_user)
    populate_redis_link(short_url, payload.target_url, current_user["plan"]["expiration_days"] * 86400)
    return populate_mongo_link(short_url, payload.target_url, payload.title, current_user)

#TO_DO: add pagination
@router.get(
        "", 
        response_model = list[URLInfo], 
        status_code = status.HTTP_200_OK
    )
async def get_all_shortened_urls(
        current_user: User = Depends(get_current_user)
    ):
    if not current_user["is_admin"]:
        raise HTTPException(
            status_code = status.HTTP_403_FORBIDDEN,
            detail = "You don't have permission to access this resource",
        )
    return list(link_collection.find())

@router.delete(
        "/{short_url}", 
        status_code = status.HTTP_200_OK
    )
async def delete_link_by_short_url(
        short_url: str,
        current_user: User = Depends(get_current_user)
    ):
    if not current_user["is_admin"] or get_short_link_owner(short_url) != current_user:
        raise HTTPException(
            status_code = status.HTTP_403_FORBIDDEN,
            detail = "You don't have permission to access this resource",
        )
    link_collection.delete_one({"short_url": short_url})
    return {}

@router.get(
        "/{short_url}", 
        response_model = URLBase, 
        status_code = status.HTTP_200_OK
    )
async def get_link_by_short_url(
        short_url: str,
        current_user: User = Depends(get_current_user)
    ):
    print(get_short_link_owner(short_url)["username"])
    print(current_user["username"])
    if not current_user["is_admin"] and get_short_link_owner(short_url)["username"] != current_user["username"]:
        raise HTTPException(
            status_code = status.HTTP_403_FORBIDDEN,
            detail = "You don't have permission to access this resource",
        )
    return URLBase(target_url = redis_db.get(short_url))

@router.get(
        "/{short_url}/metadata", 
        response_model = URLInfo, 
        status_code = status.HTTP_200_OK
    )
async def get_link_metadata_by_short_url(
        short_url: str,
        current_user: User = Depends(get_current_user)
    ):
    if not current_user["is_admin"] and get_short_link_owner(short_url)["username"] != current_user["username"]:
        raise HTTPException(
            status_code = status.HTTP_403_FORBIDDEN,
            detail = "You don't have permission to access this resource",
        )
    return link_collection.find_one({"short_url": short_url})


class UpdateURL(BaseModel):
    short_url: str

#TODO
@router.put(
        "/{short_url}", 
        response_model = URLInfo, 
        status_code = status.HTTP_200_OK
    )
async def modify_link_by_short_url(
        short_url: str, 
        custom_short_url: UpdateURL,
        current_user: User = Depends(get_current_user),
    ):
    if not current_user["is_admin"] and get_short_link_owner(short_url)["username"] != current_user["username"]:
        raise HTTPException(
            status_code = status.HTTP_403_FORBIDDEN,
            detail = "You don't have permission to access this resource",
        )
    if redis_db.exists(custom_short_url.short_url):
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "The provided short URL is already in use",
        )
    redis_db.set(custom_short_url.short_url, redis_db.get(short_url))
    redis_db.expire(custom_short_url.short_url, redis_db.ttl(short_url))
    redis_db.delete(short_url)
    link_collection.update_one({"short_url": short_url}, {"$set": {"short_url": custom_short_url.short_url}})
    return link_collection.find_one({"short_url": custom_short_url.short_url})
