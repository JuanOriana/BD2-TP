from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.core.schemas.user import User, UserInDB
from app.core.schemas.token import Token
from app.database import fake_users_db
router = APIRouter()

def fake_hash_password(password: str):
    return "fakehashed" + password

@router.post("", response_model=Token, status_code=201)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(
            status_code=400, detail="Incorrect username or password")
    user = UserInDB(**user_dict)
    hashed_password = fake_hash_password(form_data.password)
    if not hashed_password == user.hashed_password:
        raise HTTPException(
            status_code=400, detail="Incorrect username or password")
            
    return {"access_token": user.username, "token_type": "bearer"}