import Card from "../common/Card";
import EmptyState from "../common/EmptyState";

import TeamCard from "./TeamCard";

export default function TeamComparison({ teams }) {

    if (!teams) {
        return (
            <Card>
                <EmptyState
                    title="No Teams Generated"
                    description="Click 'Generate Balanced Teams' to create two balanced football teams."
                />
            </Card>
        );
    }

    const winner =
        teams.strengthA > teams.strengthB
            ? "Team A"
            : teams.strengthB > teams.strengthA
            ? "Team B"
            : "Perfectly Balanced";

    const differenceColor =
        teams.difference <= 1
            ? "text-emerald-400"
            : teams.difference <= 3
            ? "text-yellow-400"
            : "text-red-400";

    const balancePercentage = Math.max(
        0,
        100 - teams.difference * 10
    );

    return (

        <section className="mt-10 space-y-8">

            {/* Summary */}

            <Card>

                <div className="grid gap-8 md:grid-cols-4">

                    <div className="text-center">

                        <p className="text-sm uppercase tracking-wide text-slate-400">
                            Team A
                        </p>

                        <h2 className="mt-2 text-5xl font-bold text-sky-400">
                            {teams.strengthA}
                        </h2>

                    </div>

                    <div className="text-center">

                        <p className="text-sm uppercase tracking-wide text-slate-400">
                            Difference
                        </p>

                        <h2
                            className={`mt-2 text-5xl font-bold ${differenceColor}`}
                        >
                            {teams.difference}
                        </h2>

                    </div>

                    <div className="text-center">

                        <p className="text-sm uppercase tracking-wide text-slate-400">
                            Team B
                        </p>

                        <h2 className="mt-2 text-5xl font-bold text-purple-400">
                            {teams.strengthB}
                        </h2>

                    </div>

                    <div className="text-center">

                        <p className="text-sm uppercase tracking-wide text-slate-400">
                            Winner
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-emerald-400">
                            {winner}
                        </h2>

                    </div>

                </div>

                {/* Balance Meter */}

                <div className="mt-10">

                    <div className="mb-2 flex justify-between text-sm text-slate-400">

                        <span>Balance Score</span>

                        <span>{balancePercentage}%</span>

                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-800">

                        <div
                            className="
                                h-full
                                rounded-full
                                bg-gradient-to-r
                                from-emerald-500
                                to-green-400
                                transition-all
                                duration-700
                            "
                            style={{
                                width: `${balancePercentage}%`,
                            }}
                        />

                    </div>

                </div>

            </Card>

            {/* Teams */}

            <div className="grid gap-8 xl:grid-cols-2">

                <TeamCard
                    title="⚽ Team A"
                    players={teams.teamA}
                    strength={teams.strengthA}
                />

                <TeamCard
                    title="⚽ Team B"
                    players={teams.teamB}
                    strength={teams.strengthB}
                />

            </div>

        </section>

    );

}