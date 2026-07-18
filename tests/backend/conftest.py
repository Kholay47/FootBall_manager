import pytest

import src.player_manager as player_manager
from src.models import Player


@pytest.fixture
def sample_players():
    return [
        Player("Messi", "Elite", 1, True),
        Player("Ronaldo", "Elite", 2, False),
        Player("Pedri", "Good", 1, True),
    ]


@pytest.fixture
def temp_json_file(tmp_path, monkeypatch):
    """
    Creates a temporary JSON file and redirects
    player_manager.JSON_FILE to it.
    """
    json_file = tmp_path / "players.json"

    json_file.write_text("[]", encoding="utf-8")

    monkeypatch.setattr(player_manager, "JSON_FILE", json_file)

    return json_file
