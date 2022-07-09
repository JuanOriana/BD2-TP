from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.core.schemas.user import User, UserInDB
from app.core.schemas.url import URLInfo
from app.core.schemas.plan import Plan
from app.database import fake_users_db
from app.core.models.user_register import UserRegister
from app.database import user_collection
from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
router = APIRouter()

# GETs
@router.get("", response_model=list[User], status_code=200)
async def get_all_users():
    return []

@router.get("/me", response_model=User, status_code=200)
async def get_current_user(current_user: User = Depends()):
    return current_user

@router.get("/{username}", response_model=User, status_code=200)
async def get_user_by_username(username: str):
    return {"username": username}

@router.get("/{username}/links", response_model=list[URLInfo], status_code=200)
async def get_user_links_by_username(username: str):
    return []

@router.get("/{username}/plan", response_model=Plan, status_code=200)
async def get_user_plan_by_username(username: str):
    return {"plan_id": 1, "expiration_days": 30, "max_url_count": 5000} 

# POSTs

@router.post("", status_code=201)
async def register_user(user: UserRegister):
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": pwd_context.hash(user.password)
    }
    user_exists = user_collection.find_one({"username": new_user["username"]})
    email_exists = user_collection.find_one({"email": new_user["email"]})

    if not user_exists and not email_exists:
	    user_collection.insert_one(new_user)
	    return {}
    else:
	    raise HTTPException(status_code=409, detail="Username/email already exists")


# DELETEs
@router.delete("/{username}", status_code=204)
async def delete_user_by_username(username: str):
    return 


