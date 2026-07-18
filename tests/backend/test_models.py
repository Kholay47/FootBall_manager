from src.models import Player

# ---------------------------------------------------
# Initialization
# ---------------------------------------------------


def test_create_player():
    player = Player(
        name="Messi",
        tier="Elite",
        rank=1,
        available=True,
    )

    assert player.name == "Messi"
    assert player.tier == "Elite"
    assert player.rank == 1
    assert player.available is True


def test_default_values():
    player = Player(
        name="Neymar",
        tier="Good",
    )

    assert player.rank == 0
    assert player.available is False


# ---------------------------------------------------
# to_dict
# ---------------------------------------------------


def test_to_dict():
    player = Player(
        "Ronaldo",
        "Elite",
        2,
        True,
    )

    expected = {
        "name": "Ronaldo",
        "tier": "Elite",
        "rank": 2,
        "available": True,
    }

    assert player.to_dict() == expected


# ---------------------------------------------------
# from_dict
# ---------------------------------------------------


def test_from_dict():
    data = {
        "name": "Messi",
        "tier": "Elite",
        "rank": 1,
        "available": True,
    }

    player = Player.from_dict(data)

    assert isinstance(player, Player)
    assert player.name == "Messi"
    assert player.tier == "Elite"
    assert player.rank == 1
    assert player.available is True


def test_from_dict_defaults():
    data = {
        "name": "Pedri",
        "tier": "Good",
    }

    player = Player.from_dict(data)

    assert player.rank == 0
    assert player.available is False


# ---------------------------------------------------
# Round Trip
# ---------------------------------------------------


def test_round_trip_conversion():
    original = Player(
        "Mbappe",
        "Elite",
        5,
        True,
    )

    recreated = Player.from_dict(original.to_dict())

    assert recreated.name == original.name
    assert recreated.tier == original.tier
    assert recreated.rank == original.rank
    assert recreated.available == original.available


# ---------------------------------------------------
# __repr__
# ---------------------------------------------------


def test_repr_available():
    player = Player(
        "Messi",
        "Elite",
        1,
        True,
    )

    expected = "Messi | Tier: Elite | Rank: 1 | Available"

    assert repr(player) == expected


def test_repr_unavailable():
    player = Player(
        "Neymar",
        "Good",
        3,
        False,
    )

    expected = "Neymar | Tier: Good | Rank: 3 | Unavailable"

    assert repr(player) == expected


# ---------------------------------------------------
# Object Independence
# ---------------------------------------------------


def test_multiple_players_are_independent():
    messi = Player("Messi", "Elite", 1, True)
    ronaldo = Player("Ronaldo", "Elite", 2, False)

    ronaldo.available = True

    assert messi.available is True
    assert ronaldo.available is True
    assert messi.rank == 1
    assert ronaldo.rank == 2


# ---------------------------------------------------
# Dictionary Mutation Safety
# ---------------------------------------------------


def test_to_dict_returns_new_dictionary():
    player = Player(
        "Messi",
        "Elite",
        1,
        True,
    )

    data = player.to_dict()

    data["name"] = "Changed"

    assert player.name == "Messi"
