const TIER_COLORS = {
    Elite: "red",
    Good: "blue",
    Average: "yellow",
};

const TIER_SCORE = {
    Elite: 3,
    Good: 2,
    Average: 1,
};

export function formatTier(tier) {
    return {
        label: tier,
        color: TIER_COLORS[tier] ?? "gray",
        score: TIER_SCORE[tier] ?? 0,
    };
}

export function getTierColor(tier) {
    return TIER_COLORS[tier] ?? "gray";
}

export function getTierScore(tier) {
    return TIER_SCORE[tier] ?? 0;
}