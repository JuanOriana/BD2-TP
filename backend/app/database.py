import redis
import pymongo
from app.core.config import settings
from typing import Any

redis_client = redis.Redis(host=settings.REDIS_HOSTNAME, port=settings.REDIS_PORT, db=0, password=settings.REDIS_PASSWORD)


mongo_client = pymongo.MongoClient(settings.MONGODB_URL)
mongo_db = mongo_client["shawty"]
user_collection = mongo_db["users"]

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "fakehashedsecret",
        "disabled": False,
    },
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderson",
        "email": "alice@example.com",
        "hashed_password": "fakehashedsecret2",
        "disabled": True,
    },
}