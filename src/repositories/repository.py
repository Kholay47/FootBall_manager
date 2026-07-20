from abc import ABC, abstractmethod

from src.models import Player


class PlayerRepository(ABC):

    @abstractmethod
    def load_players(self) -> list[Player]:
        """Return all players."""
        raise NotImplementedError

    @abstractmethod
    def save_players(self, players: list[Player]) -> None:
        """Save all players."""
        raise NotImplementedError
