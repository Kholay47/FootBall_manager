from os import getenv

from dotenv import load_dotenv

from src.database.mongo import database
from src.models import Player
from src.repositories.repository import PlayerRepository

load_dotenv()


class MongoRepository(PlayerRepository):
    def __init__(self):
        collection_name = getenv("COLLECTION_NAME", "players")
        self.collection = database[collection_name]

    def load_players(self) -> list[Player]:
        players = []

        for document in self.collection.find():
            document.pop("_id", None)
            players.append(Player.from_dict(document))

        return players

    def save_players(self, players: list[Player]) -> None:
        self.collection.delete_many({})

        self.collection.insert_many([player.to_dict() for player in players])
