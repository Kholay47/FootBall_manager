from src.player_importer import sync_players, assign_tiers
from src.team_generator import generate_teams
from src.player_manager import (
    save_players,
    view_players,
    select_available_players,
)
from src.player_editor import manage_players


def import_new_players():
    """
    Import new players from the CSV into players.json.
    """

    existing_players, new_players = sync_players()

    if not new_players:
        print("\nNo new players found.\n")
        return

    new_player_objects = assign_tiers(new_players)

    all_players = existing_players + new_player_objects

    save_players(all_players)

    print("\nPlayers imported successfully!\n")


def main():

    while True:
        print("\n" + "=" * 50)
        print("         FOOTBALL TEAM GENERATOR")
        print("=" * 50)

        print("1. Import New Players")
        print("2. View All Players")
        print("3. Manage Players")
        print("4. Select Today's Squad")
        print("5. Generate Teams")
        print("6. Exit")

        choice = input("\nEnter your choice: ").strip()

        if choice == "1":
            import_new_players()

        elif choice == "2":
            view_players()

        elif choice == "3":
            manage_players()

        elif choice == "4":
            select_available_players()

        elif choice == "5":
            print("\nGenerating balanced teams...\n")
            generate_teams()
            # generate_teams()

        elif choice == "6":
            print("\nEnjoyyyy!\n")
            break

        else:
            print("\nInvalid choice. Please try again.\n")


if __name__ == "__main__":
    main()
