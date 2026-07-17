/**
 * Calculate statistics for generated teams.
 */
export function calculateStats(teamData) {
    if (!teamData) {
        return {
            strengthA: 0,
            strengthB: 0,
            difference: 0,
            winner: "Tie",
            balance: "Unknown",
        };
    }

    const {
        strengthA,
        strengthB,
        difference,
    } = teamData;

    let winner = "Tie";

    if (strengthA > strengthB) {
        winner = "Team A";
    } else if (strengthB > strengthA) {
        winner = "Team B";
    }

    let balance = "Needs Improvement";

    if (difference <= 2) {
        balance = "Perfect";
    } else if (difference <= 5) {
        balance = "Good";
    }

    return {
        strengthA,
        strengthB,
        difference,
        winner,
        balance,
    };
}