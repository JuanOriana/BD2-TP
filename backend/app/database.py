import redis
import pymongo
from app.core.config import settings

redis_db = redis.Redis(host=settings.REDIS_HOSTNAME, port=settings.REDIS_PORT, db=0, password=settings.REDIS_PASSWORD)

mongo_client = pymongo.MongoClient(settings.MONGODB_URL)
mongo_db = mongo_client["shawty"]
user_collection = mongo_db["users"]
link_collection = mongo_db["links"]
plan_collection = mongo_db["plans"]


user_collection.create_index([('username', pymongo.TEXT)], name='username_index', default_language='english')
link_collection.create_index([('short_url', pymongo.TEXT)], name='short_url_index', default_language='english')

try:
    redis_db.ping()
except redis.exceptions.ConnectionError:
    raise Exception("Redis connection error")

try:
    mongo_client.list_database_names()
except pymongo.errors.ConnectionFailure:
    raise Exception("Mongo connection error")

if not plan_collection.count_documents({}):
    plan_collection.insert_one({"name": "Standard", "price": 0, "expiration_days": 30, "max_url_count": 15})
    plan_collection.insert_one({"name": "Premium", "price": 14.99, "expiration_days": 180, "max_url_count": 500})


