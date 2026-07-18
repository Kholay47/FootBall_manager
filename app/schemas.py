from pydantic import BaseModel
from typing import Optional


class PlayerCreate(BaseModel):
    name: str
    tier: str
    rank: int
    available: bool = False


class PlayerUpdate(BaseModel):
    name: str
    tier: str
    rank: int
    available: bool


class AvailabilityUpdate(BaseModel):
    available: bool
