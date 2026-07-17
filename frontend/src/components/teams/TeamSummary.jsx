import Card from "../common/Card";

export default function TeamSummary({
    teamName,
    strength,
    players,
}) {
    return (
        <Card className="mb-5">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-white">
                        {teamName}
                    </h2>

                    <p className="mt-2 text-slate-400">
                        {players.length} Players
                    </p>

                </div>

                <div className="text-right">

                    <p className="text-sm text-slate-400">
                        Team Strength
                    </p>

                    <h2 className="text-4xl font-bold text-emerald-400">
                        {strength}
                    </h2>

                </div>

            </div>

        </Card>
    );
}