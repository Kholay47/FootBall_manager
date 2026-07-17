from fastapi import APIRouter

from src.team_generator import generate_teams

router = APIRouter(
    prefix="/teams",
    tags=["Teams"],
)


@router.post("/generate")
def generate():

    return generate_teams(
        return_json=True
    )