from src.repositories.json_repository import JSONRepository
from src.repositories.mongo_repository import MongoRepository

USE_MONGO = True


def get_repository():
    if USE_MONGO:
        return MongoRepository()

    return JSONRepository()
