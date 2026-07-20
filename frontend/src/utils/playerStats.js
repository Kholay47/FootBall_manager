export function getPlayerStats(players = []) {
    const stats = {
        total: players.length,

        available: 0,

        unavailable: 0,

        elite: 0,

        good: 0,

        average: 0,

        averageRank: 0,
    };

    if (!players.length) {
        return stats;
    }

    let totalRank = 0;

    players.forEach((player) => {
        if (player.available) {
            stats.available++;
        } else {
            stats.unavailable++;
        }

        switch (player.tier) {
            case "Elite":
                stats.elite++;
                break;

            case "Good":
                stats.good++;
                break;

            default:
                stats.average++;
        }

        totalRank += player.rank;
    });

    stats.averageRank = Number(
        (totalRank / players.length).toFixed(2)
    );

    return stats;
}