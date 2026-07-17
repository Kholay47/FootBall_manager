import Card from "../common/Card";

import TeamCard from "./TeamCard";

export default function TeamComparison({

    teams,

}) {

    if (!teams)
        return null;

    return (

        <section className="mt-10 space-y-8">

            <Card>

                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

                    <div className="text-center">

                        <p className="text-slate-400">
                            Strength A
                        </p>

                        <h2 className="text-4xl font-bold text-sky-400">
                            {teams.strengthA}
                        </h2>

                    </div>

                    <div className="text-center">

                        <p className="text-slate-400">
                            Difference
                        </p>

                        <h2 className="text-5xl font-bold text-emerald-400">
                            {teams.difference}
                        </h2>

                    </div>

                    <div className="text-center">

                        <p className="text-slate-400">
                            Strength B
                        </p>

                        <h2 className="text-4xl font-bold text-purple-400">
                            {teams.strengthB}
                        </h2>

                    </div>

                </div>

            </Card>

            <div className="grid gap-8 xl:grid-cols-2">

                <TeamCard
                    title="Team A"
                    players={teams.teamA}
                    strength={teams.strengthA}
                />

                <TeamCard
                    title="Team B"
                    players={teams.teamB}
                    strength={teams.strengthB}
                />

            </div>

        </section>

    );

}