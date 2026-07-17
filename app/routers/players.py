from fastapi import APIRouter, HTTPException

from app.schemas import PlayerCreate, PlayerUpdate, AvailabilityUpdate

from src.models import Player
from src.player_editor import (
    create_player,
    update_player,
    remove_player,
    update_availability,
)
from src.player_manager import load_players

router = APIRouter(
    prefix="/players",
    tags=["Players"],
)


# =====================================================
# GET ALL PLAYERS
# =====================================================

@router.get("")
def get_players():
    players = load_players()

    return [
        player.to_dict()
        for player in players
    ]


# =====================================================
# CREATE PLAYER
# =====================================================

@router.post("", status_code=201)
def add_player(player: PlayerCreate):
    try:
        created = create_player(
            Player(
                name=player.name,
                tier=player.tier,
                rank=player.rank,
                available=player.available,
            )
        )

        return created.to_dict()

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# =====================================================
# UPDATE PLAYER
# =====================================================

@router.put("/{player_name}")
def edit_player(
    player_name: str,
    player: PlayerUpdate,
):
    try:
        updated = update_player(
            player_name,
            Player(
                name=player.name,
                tier=player.tier,
                rank=player.rank,
                available=player.available,
            ),
        )

        return updated.to_dict()

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


# =====================================================
# DELETE PLAYER
# =====================================================

@router.delete("/{player_name}")
def delete_player_route(player_name: str):
    try:
        remove_player(player_name)

        return {
            "success": True,
            "message": "Player deleted successfully.",
        }

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


# =====================================================
# TOGGLE AVAILABILITY
# =====================================================

@router.patch("/{player_name}/availability")
def toggle_player_availability(
    player_name: str,
    payload: AvailabilityUpdate,
):
    try:
        updated = update_availability(
            player_name,
            payload.available,
        )

        return updated.to_dict()

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

