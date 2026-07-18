import random

from src.player_manager import load_players

# -------------------------------
# Configuration
# -------------------------------

ITERATIONS = 2000

TIER_BASE_SCORE = {
    "Elite": 100,
    "Good": 70,
    "Average": 40,
}

RANK_DEDUCTION = 5


# -------------------------------
# Player Score
# -------------------------------


def get_player_score(player):
    base = TIER_BASE_SCORE[player.tier]

    return max(
        base - ((player.rank - 1) * RANK_DEDUCTION),
        1,
    )


# -------------------------------
# Team Strength
# -------------------------------


def team_strength(team):
    return sum(get_player_score(p) for p in team)


# -------------------------------
# Fitness Function
# -------------------------------


def fitness(team_a, team_b):
    """
    Lower fitness is better.

    Current fitness:
        strength difference

    Can later include:
        repeated pairs
        captain penalty
        position balance
    """

    return abs(team_strength(team_a) - team_strength(team_b))


# -------------------------------
# Random Split
# -------------------------------


def random_split(players):
    """
    Guided random split.

    Players are sorted by strength.
    Every adjacent pair is randomly split between teams.
    """

    ranked = sorted(
        players,
        key=get_player_score,
        reverse=True,
    )

    team_a = []
    team_b = []

    for i in range(0, len(ranked) - 1, 2):

        pair = [ranked[i], ranked[i + 1]]
        random.shuffle(pair)

        team_a.append(pair[0])
        team_b.append(pair[1])

    # Handle odd player count
    if len(ranked) % 2 == 1:

        last = ranked[-1]

        if len(team_a) < len(team_b):
            team_a.append(last)
        else:
            team_b.append(last)

    return team_a, team_b


# -------------------------------
# Monte Carlo Optimizer
# -------------------------------
def optimize_teams(players):
    """
    Monte Carlo optimizer.

    1. Generate a guided random split.
    2. Improve it using hill climbing.
    3. Remove duplicate team combinations.
    4. Keep only the best 10.
    5. Return one random balanced match.
    """

    best_candidates = []
    seen = set()

    for _ in range(ITERATIONS):

        team_a, team_b = random_split(players)

        team_a, team_b = improve_teams(team_a, team_b)

        # Canonical signature (Team A/B order doesn't matter)
        sig_a = tuple(sorted(p.name for p in team_a))
        sig_b = tuple(sorted(p.name for p in team_b))

        signature = tuple(sorted((sig_a, sig_b)))

        if signature in seen:
            continue

        seen.add(signature)

        score = fitness(team_a, team_b)

        best_candidates.append(
            (
                score,
                team_a[:],
                team_b[:],
            )
        )

        # Keep only the best 10 candidates
        best_candidates.sort(key=lambda x: x[0])

        if len(best_candidates) > 10:
            best_candidates.pop()

        # Perfect balance found
        if score == 0:
            return (
                score,
                team_a[:],
                team_b[:],
            )

    if not best_candidates:
        raise RuntimeError("Unable to generate balanced teams.")

    return random.choice(best_candidates)


def improve_teams(team_a, team_b):
    """
    Hill climbing optimization.

    Repeatedly swaps players between teams whenever
    the swap improves the fitness.

    Stops when no improving swap exists.
    """

    while True:

        current = fitness(team_a, team_b)
        improved = False

        for i, player_a in enumerate(team_a):

            for j, player_b in enumerate(team_b):

                # Try swap
                team_a[i], team_b[j] = player_b, player_a

                new_score = fitness(team_a, team_b)

                if new_score < current:
                    improved = True
                    break

                # Undo swap
                team_a[i], team_b[j] = player_a, player_b

            if improved:
                break

        if not improved:
            break

    return team_a, team_b


# -------------------------------
# Display
# -------------------------------


def print_teams(team_a, team_b):

    score_a = team_strength(team_a)
    score_b = team_strength(team_b)

    print("\n" + "=" * 70)
    print(" " * 25 + "MATCH TEAMS")
    print("=" * 70)

    print(f"{'TEAM A':<35}{'TEAM B'}")

    print("-" * 70)

    rows = max(len(team_a), len(team_b))

    for i in range(rows):

        left = ""
        right = ""

        if i < len(team_a):
            p = team_a[i]
            left = f"{p.name} ({p.tier} #{p.rank})"

        if i < len(team_b):
            p = team_b[i]
            right = f"{p.name} ({p.tier} #{p.rank})"

        print(f"{left:<35}{right}")

    print("-" * 70)

    print(f"{'Players: ' + str(len(team_a)):<35}Players: {len(team_b)}")

    print(f"{'Strength: ' + str(score_a):<35}Strength: {score_b}")

    print("-" * 70)

    print(f"Difference : {abs(score_a-score_b)}")

    print("=" * 70)

    print()


# -------------------------------
# Main Generator
# -------------------------------


def generate_teams(return_json=False):

    players = load_players()

    available = [p for p in players if p.available]

    if len(available) < 2:
        return {
            "success": False,
            "message": "At least two available players are required.",
        }

    _, team_a, team_b = optimize_teams(available)

    score_a = team_strength(team_a)
    score_b = team_strength(team_b)

    result = {
        "success": True,
        "teamA": [
            {
                "name": p.name,
                "tier": p.tier,
                "rank": p.rank,
                "score": get_player_score(p),
            }
            for p in team_a
        ],
        "teamB": [
            {
                "name": p.name,
                "tier": p.tier,
                "rank": p.rank,
                "score": get_player_score(p),
            }
            for p in team_b
        ],
        "strengthA": score_a,
        "strengthB": score_b,
        "difference": abs(score_a - score_b),
    }

    if return_json:
        return result

    print_teams(team_a, team_b)

    return result
