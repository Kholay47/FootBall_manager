import csv

from pathlib import Path
from src.models import Player
from src.repositories.factory import get_repository

repo = get_repository()
CSV_FILE = Path("data/players.csv")


def load_csv_players():
    """
    Reads player names from the CSV file.
    Returns a list of player names.
    """

    players = []

    with open(CSV_FILE, newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)

        for row in reader:
            name = row["Name"].strip()

            if name:
                players.append(name)

    return players


def sync_players():
    """
    Compares CSV players with JSON players.

    Returns:
        existing_players -> Already present in JSON
        new_players -> Players found in CSV but not in JSON
    """

    csv_players = load_csv_players()
    existing_players = repo.load_players()

    existing_names = {player.name.lower() for player in existing_players}

    new_players = []

    for name in csv_players:
        if name.lower() not in existing_names:
            new_players.append(name)

    return existing_players, new_players


def _read_selection(prompt, max_number):
    """
    Reads a space-separated list of player numbers.
    """

    while True:
        try:
            numbers = [int(x) for x in input(prompt).split()]

            if len(numbers) != len(set(numbers)):
                print("Duplicate numbers are not allowed.\n")
                continue

            if any(n < 1 or n > max_number for n in numbers):
                print("One or more numbers are invalid.\n")
                continue

            return numbers

        except ValueError:
            print("Please enter valid numbers.\n")


def _rank_players(indices, player_names, tier):
    """
    Assigns ranks within a tier.

    indices -> original player numbers belonging to this tier
    """

    if not indices:
        return {}

    print(f"\n===== {tier.upper()} PLAYERS =====\n")

    for number in indices:
        print(f"{number}. {player_names[number - 1]}")

    print()

    while True:
        ranking = _read_selection(
            f"Enter {tier} players in strongest-to-weakest order: ",
            len(player_names),
        )

        if set(ranking) != set(indices):
            print("\nPlease enter exactly the player numbers shown above.\n")
            continue

        ranks = {}

        for rank, player_number in enumerate(ranking, start=1):
            ranks[player_number] = rank

        return ranks


def assign_tiers(new_players):
    """
    Assigns tiers and ranks to new players.
    """

    if not new_players:
        print("\nNo new players found.\n")
        return []

    print("\n========== NEW PLAYERS ==========\n")

    for index, player in enumerate(new_players, start=1):
        print(f"{index}. {player}")

    print()

    elite = _read_selection(
        "Enter Elite player numbers: ",
        len(new_players),
    )

    remaining = [i for i in range(1, len(new_players) + 1) if i not in elite]

    if remaining:
        print("\nRemaining Players:\n")

        for i in remaining:
            print(f"{i}. {new_players[i - 1]}")

        print()

    while True:
        good = _read_selection(
            "Enter Good player numbers: ",
            len(new_players),
        )

        if any(i in elite for i in good):
            print("\nA player cannot belong to multiple tiers.\n")
            continue

        break

    average = [
        i for i in range(1, len(new_players) + 1) if i not in elite and i not in good
    ]

    elite_ranks = _rank_players(elite, new_players, "Elite")
    good_ranks = _rank_players(good, new_players, "Good")
    average_ranks = _rank_players(average, new_players, "Average")

    players = []

    for index, name in enumerate(new_players, start=1):
        if index in elite:
            tier = "Elite"
            rank = elite_ranks[index]

        elif index in good:
            tier = "Good"
            rank = good_ranks[index]

        else:
            tier = "Average"
            rank = average_ranks[index]

        players.append(
            Player(
                name=name,
                tier=tier,
                rank=rank,
                available=False,
            )
        )

    return players
