from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.core.schemas.user import User, UserInDB
from app.core.schemas.url import URLInfo
from app.core.schemas.plan import Plan
from app.database import fake_users_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
router = APIRouter()

def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def fake_decode_token(token):
    user = get_user(fake_users_db, token)
    return user

async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# Implement admin/self middleware later for below methods

# GETs
@router.get("", response_model=list[User], status_code=200)
async def get_all_users():
    return []

@router.get("/me", response_model=User, status_code=200)
async def get_current_user(current_user: User = Depends(get_current_active_user)):
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

# DELETEs
@router.delete("/{username}", status_code=204)
async def delete_user_by_username(username: str):
    return 

