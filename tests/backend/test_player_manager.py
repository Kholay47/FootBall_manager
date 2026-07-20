import json

from src.models import Player
from src.player_manager import (
    load_players,
    save_players,
    select_available_players,
    view_players,
)

# ==========================================================
# load_players()
# ==========================================================


def test_load_players_empty_file(temp_json_file):
    players = load_players()

    assert players == []


def test_load_players_returns_player_objects(temp_json_file):
    data = [
        {
            "name": "Messi",
            "tier": "Elite",
            "rank": 1,
            "available": True,
        },
        {
            "name": "Ronaldo",
            "tier": "Elite",
            "rank": 2,
            "available": False,
        },
    ]

    temp_json_file.write_text(
        json.dumps(data),
        encoding="utf-8",
    )

    players = load_players()

    assert len(players) == 2

    assert isinstance(players[0], Player)
    assert isinstance(players[1], Player)

    assert players[0].name == "Messi"
    assert players[1].name == "Ronaldo"


def test_load_players_file_not_exists(tmp_path, monkeypatch):
    import src.player_manager as player_manager

    missing_file = tmp_path / "missing.json"

    monkeypatch.setattr(
        player_manager,
        "JSON_FILE",
        missing_file,
    )

    players = load_players()

    assert players == []


# ==========================================================
# save_players()
# ==========================================================


def test_save_players_creates_json(
    temp_json_file,
    sample_players,
):
    save_players(sample_players)

    assert temp_json_file.exists()

    data = json.loads(
        temp_json_file.read_text(
            encoding="utf-8",
        )
    )

    assert len(data) == 3


def test_save_players_correct_content(
    temp_json_file,
    sample_players,
):
    save_players(sample_players)

    data = json.loads(
        temp_json_file.read_text(
            encoding="utf-8",
        )
    )

    assert data[0]["name"] == "Messi"
    assert data[1]["tier"] == "Elite"
    assert data[2]["available"] is True


# ==========================================================
# view_players()
# ==========================================================


def test_view_players_empty(
    temp_json_file,
    capsys,
):
    view_players()

    output = capsys.readouterr().out

    assert "No players found." in output


def test_view_players_header(
    temp_json_file,
    sample_players,
    capsys,
):
    save_players(sample_players)

    view_players()

    output = capsys.readouterr().out

    assert "ALL PLAYERS" in output
    assert "Name" in output
    assert "Tier" in output
    assert "Rank" in output
    assert "Status" in output


def test_view_players_prints_players(
    temp_json_file,
    sample_players,
    capsys,
):
    save_players(sample_players)

    view_players()

    output = capsys.readouterr().out

    assert "Messi" in output
    assert "Ronaldo" in output
    assert "Pedri" in output


def test_view_players_sorted(
    temp_json_file,
    capsys,
):
    players = [
        Player("Charlie", "Average", 3),
        Player("Messi", "Elite", 2),
        Player("Pedri", "Good", 1),
        Player("Ronaldo", "Elite", 1),
    ]

    save_players(players)

    view_players()

    output = capsys.readouterr().out

    assert output.index("Ronaldo") < output.index("Messi")
    assert output.index("Messi") < output.index("Pedri")
    assert output.index("Pedri") < output.index("Charlie")


# ==========================================================
# select_available_players()
# ==========================================================


def test_select_available_players(
    temp_json_file,
    sample_players,
    monkeypatch,
):
    save_players(sample_players)

    monkeypatch.setattr(
        "builtins.input",
        lambda _: "1 3",
    )

    select_available_players()

    players = load_players()

    assert players[0].available is True
    assert players[1].available is False
    assert players[2].available is True


def test_invalid_player_numbers_are_ignored(
    temp_json_file,
    sample_players,
    monkeypatch,
):
    save_players(sample_players)

    monkeypatch.setattr(
        "builtins.input",
        lambda _: "25 -1 abc",
    )

    select_available_players()

    players = load_players()

    assert all(player.available is False for player in players)


def test_duplicate_numbers(
    temp_json_file,
    sample_players,
    monkeypatch,
):
    save_players(sample_players)

    monkeypatch.setattr(
        "builtins.input",
        lambda _: "1 1 1 2 2",
    )

    select_available_players()

    players = load_players()

    assert players[0].available is True
    assert players[1].available is True
    assert players[2].available is False


def test_success_message(
    temp_json_file,
    sample_players,
    monkeypatch,
    capsys,
):
    save_players(sample_players)

    monkeypatch.setattr(
        "builtins.input",
        lambda _: "1",
    )

    select_available_players()

    output = capsys.readouterr().out

    assert "Today's squad updated successfully!" in output
