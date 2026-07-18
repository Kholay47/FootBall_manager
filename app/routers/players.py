from fastapi import APIRouter, HTTPException

from app.schemas import (
    AvailabilityUpdate,
    PlayerCreate,
    PlayerUpdate,
)
from src.models import Player
from src.player_editor import (
    create_player,
    get_all_players,
    remove_player,
    update_availability,
    update_player,
)

router = APIRouter(
    prefix="/players",
    tags=["Players"],
)


# =====================================================
# GET ALL PLAYERS
# =====================================================


@router.get("")
def get_players():
    """
    Return every player.
    """

    players = get_all_players()

    return [player.to_dict() for player in players]


# =====================================================
# GET SINGLE PLAYER
# =====================================================


@router.get("/{player_name}")
def get_player(
    player_name: str,
):
    """
    Return a single player.
    """

    players = get_all_players()

    for player in players:
        if player.name.lower() == player_name.lower():
            return player.to_dict()

    raise HTTPException(
        status_code=404,
        detail=f"Player '{player_name}' not found.",
    )


# =====================================================
# CREATE PLAYER
# =====================================================


@router.post(
    "",
    status_code=201,
)
def add_player(
    player: PlayerCreate,
):
    """
    Create a new player.
    """

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
        ) from e


# =====================================================
# UPDATE PLAYER
# =====================================================


@router.put("/{player_name}")
def edit_player(
    player_name: str,
    player: PlayerUpdate,
):
    """
    Replace an existing player.
    """

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
        ) from e


# =====================================================
# UPDATE AVAILABILITY
# =====================================================


@router.patch("/{player_name}/availability")
def change_availability(
    player_name: str,
    payload: AvailabilityUpdate,
):
    """
    Toggle player's availability.
    """

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
        ) from e


# =====================================================
# DELETE PLAYER
# =====================================================


@router.delete("/{player_name}")
def delete_player(
    player_name: str,
):
    """
    Delete a player.
    """

    try:
        remove_player(
            player_name,
        )

        return {
            "success": True,
            "message": "Player deleted successfully.",
        }

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        ) from e
