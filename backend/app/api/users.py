from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.api.plans import get_standard_plan
from app.core.schemas.user import User, UserInDB
from app.core.schemas.token_data import TokenData
from app.core.schemas.url import URLInfo
from app.core.models.user_register import UserRegister
from app.core.schemas.plan import Plan, ExtPlan
from app.core.config import settings
from app.database import user_collection, plan_collection, link_collection

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
router = APIRouter()

async def get_current_user(
        token: str = Depends(oauth2_scheme)
    ):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = user_collection.find_one({"username": username})
    if user is None:
        raise credentials_exception
    return user

# GETs

#TO_DO: add pagination?
@router.get(
        "", 
        response_model = list[User], 
        status_code = status.HTTP_200_OK
    )
async def get_all_users(
        current_user: User = Depends(get_current_user)
    ):
    if not current_user["is_admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to access this resource",
        )
    users = list(user_collection.find())
    return users

@router.get(
        "/me", 
        response_model = User, 
        status_code = status.HTTP_200_OK
    )
async def get_current_user_profile(
        current_user: User = Depends(get_current_user)
    ):
    return current_user

@router.get(
        "/{username}", 
        response_model = User, 
        status_code = status.HTTP_200_OK
    )
async def get_user_by_username(
        username: str, 
        current_user: User = Depends(get_current_user)
    ):
    if(current_user["username"] == username or current_user["is_admin"]):
        return current_user
    else:
        raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, 
                detail="You don't have permission to access this resource",
            )

@router.get(
        "/{username}/links", 
        response_model = list[URLInfo], 
        status_code = status.HTTP_200_OK
    )
async def get_user_links_by_username(
        username: str, 
        current_user: User = Depends(get_current_user)
    ):
    if(current_user["username"] == username or current_user["is_admin"]):
        links = list(link_collection.find({"author.username": username}))
        return links
    else:
        raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, 
                detail="You don't have permission to access this resource",
            )

@router.get(
        "/{username}/plan", 
        response_model = ExtPlan, 
        status_code = status.HTTP_200_OK
    )
async def get_user_plan_by_username(
        username: str, 
        current_user: User = Depends(get_current_user)
    ):
    if(current_user["username"] == username or current_user["is_admin"]):
        user = user_collection.find_one({"username": username})
        if not user:
            raise HTTPException(
                    status_code=404, 
                    detail="User not found",
                )
        return ExtPlan(**user["plan"])
    else:
        raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, 
                detail="You don't have permission to access this resource",
            )

# # POSTs

@router.post(
        "", 
        status_code = status.HTTP_201_CREATED,
        response_model = User
    )
async def register(
        user: UserRegister
    ):
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": pwd_context.hash(user.password),
        "is_admin": False,
        "plan": get_standard_plan(),
    }
    user = user_collection.find_one({"username": new_user["username"]})
    email = user_collection.find_one({"email": new_user["email"]})

    if not user and not email:
	    user_collection.insert_one(new_user)
	    return new_user
    else:
	    raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, 
                detail="Username/email already exists"
            )


# DELETEs
@router.delete(
        "/{username}", 
        status_code = status.HTTP_200_OK
    )
async def delete_user_by_username(
        username: str, 
        current_user: User = Depends(get_current_user),
    ):
    if not current_user["is_admin"]:
        raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, 
                detail="You don't have permission to access this resource"
            )
    user_collection.delete_one({"username": username})
    return {}


