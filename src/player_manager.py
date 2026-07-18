import json
from pathlib import Path

from src.models import Player

JSON_FILE = Path("data/players.json")


def load_players():
    """
    Load all players from players.json.
    Returns a list of Player objects.
    """

    if not JSON_FILE.exists():
        return []

    with open(JSON_FILE, encoding="utf-8") as file:
        data = json.load(file)

    return [Player.from_dict(player) for player in data]


def save_players(players):
    """
    Save all Player objects to players.json.
    """

    with open(JSON_FILE, "w", encoding="utf-8") as file:
        json.dump(
            [player.to_dict() for player in players],
            file,
            indent=4,
        )


def view_players():
    """
    Display all players sorted by Tier and Rank.
    """

    players = load_players()

    if not players:
        print("\nNo players found.\n")
        return

    tier_order = {
        "Elite": 1,
        "Good": 2,
        "Average": 3,
    }

    players.sort(
        key=lambda player: (
            tier_order.get(player.tier, 99),
            player.rank,
            player.name.lower(),
        )
    )

    print("\n==================== ALL PLAYERS ====================\n")

    print(f"{'No.':<5}{'Name':<20}{'Tier':<10}{'Rank':<8}{'Status'}")

    print("-" * 60)

    for index, player in enumerate(players, start=1):
        status = "Available" if player.available else "Unavailable"

        print(f"{index:<5}{player.name:<20}{player.tier:<10}{player.rank:<8}{status}")

    print()


def select_available_players():
    """
    Allow the user to select today's available players.
    """

    players = load_players()

    if not players:
        print("\nNo players found.\n")
        return

    tier_order = {
        "Elite": 1,
        "Good": 2,
        "Average": 3,
    }

    players.sort(
        key=lambda player: (
            tier_order.get(player.tier, 99),
            player.rank,
            player.name.lower(),
        )
    )

    # Reset everyone's availability
    for player in players:
        player.available = False

    print("\n================ TODAY'S SQUAD =================\n")

    print(f"{'No.':<5}{'Name':<20}{'Tier':<10}{'Rank'}")

    print("-" * 50)

    for index, player in enumerate(players, start=1):
        print(f"{index:<5}{player.name:<20}{player.tier:<10}{player.rank}")

    print()

    selected = input("Enter player numbers playing today (space separated): ").split()

    valid_numbers = set()

    for number in selected:
        if number.isdigit():
            number = int(number)

            if 1 <= number <= len(players):
                valid_numbers.add(number)

    for number in valid_numbers:
        players[number - 1].available = True

    save_players(players)

    print(
        f"\nToday's squad updated successfully! "
        f"({len(valid_numbers)} players selected)\n"
    )
