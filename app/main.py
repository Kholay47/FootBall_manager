from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.players import router as players_router
from app.routers.teams import router as teams_router

app = FastAPI(title="Football Team Generator API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(players_router)

app.include_router(teams_router)


@app.get("/")
def home():
    return {"message": "Football Team Generator API"}
