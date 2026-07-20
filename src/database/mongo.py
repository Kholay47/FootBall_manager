from os import getenv

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGODB_URI = getenv("MONGODB_URI")
DATABASE_NAME = getenv("DATABASE_NAME", "football_manager")

client = MongoClient(MONGODB_URI)

database = client[DATABASE_NAME]
