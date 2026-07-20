import json
from pathlib import Path

from src.models import Player
from src.repositories.repository import PlayerRepository

JSON_FILE = Path("data/players.json")


class JSONRepository(PlayerRepository):

    def load_players(self) -> list[Player]:
        if not JSON_FILE.exists():
            return []

        with open(JSON_FILE, encoding="utf-8") as file:
            data = json.load(file)

        return [Player.from_dict(player) for player in data]

    def save_players(self, players: list[Player]):
        """
        Save all Player objects to players.json.
        """

        with open(JSON_FILE, "w", encoding="utf-8") as file:
            json.dump(
                [player.to_dict() for player in players],
                file,
                indent=4,
            )
