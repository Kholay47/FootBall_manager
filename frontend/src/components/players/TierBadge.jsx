import Badge from "../common/Badge";

export default function TierBadge({ tier }) {

    const colors = {
        Elite: "red",
        Good: "blue",
        Average: "yellow",
    };

    return (
        <Badge color={colors[tier] ?? "gray"}>
            {tier}
        </Badge>
    );
}