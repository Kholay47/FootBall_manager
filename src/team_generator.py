import random

from src.player_manager import load_players


TIER_BASE_SCORE = {
    "Elite": 100,
    "Good": 70,
    "Average": 40,
}

RANK_DEDUCTION = 5


def get_player_score(player):
    """
    Calculate a player's strength score based on
    their tier and rank.
    """

    base = TIER_BASE_SCORE[player.tier]

    return max(
        base - ((player.rank - 1) * RANK_DEDUCTION),
        1,
    )


def generate_teams():
    """
    Generate two balanced football teams.
    """

    players = load_players()

    available_players = [player for player in players if player.available]

    if len(available_players) < 2:
        print("\nAt least two available players are required.\n")
        return

    # Shuffle first so equal-score players are randomized
    random.shuffle(available_players)

    # Strongest players first
    available_players.sort(
        key=get_player_score,
        reverse=True,
    )

    total_players = len(available_players)

    max_team_size = (total_players + 1) // 2

    team_a = []
    team_b = []

    score_a = 0
    score_b = 0

    for player in available_players:
        player_score = get_player_score(player)

        # Team A full
        if len(team_a) >= max_team_size:
            team_b.append(player)
            score_b += player_score
            continue

        # Team B full
        if len(team_b) >= max_team_size:
            team_a.append(player)
            score_a += player_score
            continue

        # Assign to weaker team
        if score_a <= score_b:
            team_a.append(player)
            score_a += player_score
        else:
            team_b.append(player)
            score_b += player_score

    print("\n" + "=" * 65)
    print(" " * 24 + "MATCH TEAMS")
    print("=" * 65)

    print(f"{'TEAM A':<32}{'TEAM B'}")

    print("-" * 65)

    max_rows = max(len(team_a), len(team_b))

    for i in range(max_rows):
        left = ""
        right = ""

        if i < len(team_a):
            p = team_a[i]
            left = f"{p.name} ({p.tier} #{p.rank})"

        if i < len(team_b):
            p = team_b[i]
            right = f"{p.name} ({p.tier} #{p.rank})"

        print(f"{left:<32}{right}")

    print("-" * 65)

    print(f"{'Players: ' + str(len(team_a)):<32}Players: {len(team_b)}")

    print(f"{'Strength: ' + str(score_a):<32}Strength: {score_b}")

    print("-" * 65)

    print(f"Difference: {abs(score_a - score_b)} points")

    print("=" * 65)
    print()
