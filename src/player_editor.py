from src.models import Player
from src.player_manager import load_players, save_players

TIER_ORDER = {
    "1": "Elite",
    "2": "Good",
    "3": "Average",
}

TIER_PRIORITY = {
    "Elite": 1,
    "Good": 2,
    "Average": 3,
}


def manage_players():
    while True:
        print("\n========== MANAGE PLAYERS ==========\n")
        print("1. Change Player Tier")
        print("2. Change Player Rank")
        print("3. Rename Player")
        print("4. Delete Player")
        print("5. Add New Player")
        print("6. Back")

        choice = input("\nEnter your choice: ").strip()

        if choice == "1":
            change_player_tier()

        elif choice == "2":
            change_player_rank()

        elif choice == "3":
            rename_player()

        elif choice == "4":
            delete_player()

        elif choice == "5":
            add_player()

        elif choice == "6":
            break

        else:
            print("\nInvalid choice.\n")


def display_players(players):
    if not players:
        print("\nNo players found.\n")
        return

    players.sort(
        key=lambda p: (
            TIER_PRIORITY[p.tier],
            p.rank,
            p.name.lower(),
        )
    )

    print()
    print(f"{'No.':<5}{'Name':<20}{'Tier':<10}{'Rank'}")
    print("-" * 45)

    for index, player in enumerate(players, start=1):
        print(f"{index:<5}{player.name:<20}{player.tier:<10}{player.rank}")

    print()


def normalize_ranks(players):
    for tier in ["Elite", "Good", "Average"]:
        tier_players = sorted(
            [p for p in players if p.tier == tier],
            key=lambda p: p.rank,
        )

        for rank, player in enumerate(tier_players, start=1):
            player.rank = rank


def choose_player(players):
    display_players(players)

    while True:
        choice = input("Select player number: ").strip()

        if choice.isdigit():
            choice = int(choice)

            if 1 <= choice <= len(players):
                return players[choice - 1]

        print("Invalid selection.")


def insert_player_at_rank(players, player, tier, rank):
    """
    Inserts a player into a tier at the desired rank.
    Existing players are shifted down automatically.
    """

    tier_players = [p for p in players if p.tier == tier and p != player]

    tier_players.sort(key=lambda p: p.rank)

    rank = max(1, min(rank, len(tier_players) + 1))

    tier_players.insert(rank - 1, player)

    for index, p in enumerate(tier_players, start=1):
        p.tier = tier
        p.rank = index


def ask_rank(players, tier):
    tier_players = [p for p in players if p.tier == tier]

    max_rank = len(tier_players) + 1

    while True:
        rank = input(f"Enter desired rank (1-{max_rank}): ").strip()

        if rank.isdigit():
            rank = int(rank)

            if 1 <= rank <= max_rank:
                return rank

        print("Invalid rank.")


def change_player_tier():
    players = load_players()

    if not players:
        return

    player = choose_player(players)

    print("\nChoose New Tier\n")
    print("1. Elite")
    print("2. Good")
    print("3. Average")

    tier_choice = input("\nChoice: ").strip()

    if tier_choice not in TIER_ORDER:
        print("\nInvalid tier.\n")
        return

    new_tier = TIER_ORDER[tier_choice]

    old_tier = player.tier

    if new_tier == old_tier:
        print("\nPlayer is already in this tier.\n")
        return

    players.remove(player)

    normalize_ranks(players)

    players.append(player)

    desired_rank = ask_rank(players, new_tier)

    insert_player_at_rank(
        players,
        player,
        new_tier,
        desired_rank,
    )

    save_players(players)

    print("\nPlayer tier updated successfully.\n")


def change_player_rank():
    players = load_players()

    if not players:
        return

    player = choose_player(players)

    print(f"\nCurrent Rank: {player.rank}")

    while True:
        rank = input(
            f"New Rank (1-{len([p for p in players if p.tier == player.tier])}): "
        ).strip()

        if rank.isdigit():
            rank = int(rank)

            if 1 <= rank <= len([p for p in players if p.tier == player.tier]):
                break

        print("Invalid rank.")

    insert_player_at_rank(
        players,
        player,
        player.tier,
        rank,
    )

    save_players(players)

    print("\nPlayer rank updated successfully.\n")


def rename_player():
    players = load_players()

    if not players:
        return

    player = choose_player(players)

    print(f"\nCurrent Name: {player.name}")

    new_name = input("New Name: ").strip()

    if not new_name:
        print("\nName cannot be empty.\n")
        return

    player.name = new_name

    save_players(players)

    print("\nPlayer renamed successfully.\n")


def delete_player():
    players = load_players()

    if not players:
        return

    player = choose_player(players)

    confirm = input(f"Delete {player.name}? (Y/N): ").strip().lower()

    if confirm != "y":
        print("\nCancelled.\n")
        return

    players.remove(player)

    normalize_ranks(players)

    save_players(players)

    print("\nPlayer deleted successfully.\n")


def add_player():
    players = load_players()

    name = input("\nPlayer Name: ").strip()

    if not name:
        print("\nInvalid name.\n")
        return

    print("\nChoose Tier")
    print("1. Elite")
    print("2. Good")
    print("3. Average")

    tier_choice = input("\nChoice: ").strip()

    if tier_choice not in TIER_ORDER:
        print("\nInvalid tier.\n")
        return

    tier = TIER_ORDER[tier_choice]

    rank = ask_rank(players, tier)

    new_player = Player(
        name=name,
        tier=tier,
        rank=rank,
        available=False,
    )

    players.append(new_player)

    insert_player_at_rank(
        players,
        new_player,
        tier,
        rank,
    )

    save_players(players)

    print("\nPlayer added successfully.\n")
