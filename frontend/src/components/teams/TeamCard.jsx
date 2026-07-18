import { FaUsers } from "react-icons/fa";

import Card from "../common/Card";

import TeamPlayer from "./TeamPlayer";
import TeamSummary from "./TeamSummary";

export default function TeamCard({

    title,

    players,

    strength,

}) {

    const elite = players.filter(
        (player) => player.tier === "Elite"
    ).length;

    const good = players.filter(
        (player) => player.tier === "Good"
    ).length;

    const average = players.filter(
        (player) => player.tier === "Average"
    ).length;

    const averageRank =
        players.length > 0
            ? (
                  players.reduce(
                      (sum, player) => sum + player.rank,
                      0
                  ) / players.length
              ).toFixed(1)
            : 0;

    return (

        <Card className="overflow-hidden">

            {/* Header */}

            <TeamSummary
                teamName={title}
                strength={strength}
                players={players}
            />

            {/* Statistics */}

            <div className="my-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

                <div className="rounded-xl bg-slate-900 p-4 text-center">

                    <FaUsers className="mx-auto mb-2 text-emerald-400" />

                    <p className="text-sm text-slate-400">

                        Players

                    </p>

                    <h3 className="text-xl font-bold text-white">

                        {players.length}

                    </h3>

                </div>

                <div className="rounded-xl bg-slate-900 p-4 text-center">

                    <p className="text-sm text-slate-400">

                        Elite

                    </p>

                    <h3 className="text-xl font-bold text-yellow-400">

                        {elite}

                    </h3>

                </div>

                <div className="rounded-xl bg-slate-900 p-4 text-center">

                    <p className="text-sm text-slate-400">

                        Good

                    </p>

                    <h3 className="text-xl font-bold text-sky-400">

                        {good}

                    </h3>

                </div>

                <div className="rounded-xl bg-slate-900 p-4 text-center">

                    <p className="text-sm text-slate-400">

                        Avg Rank

                    </p>

                    <h3 className="text-xl font-bold text-emerald-400">

                        {averageRank}

                    </h3>

                </div>

            </div>

            {/* Tier Distribution */}

            <div className="mb-6">

                <div className="mb-2 flex justify-between text-sm text-slate-400">

                    <span>Tier Distribution</span>

                    <span>{players.length} Players</span>

                </div>

                <div className="flex h-3 overflow-hidden rounded-full">

                    <div
                        className="bg-yellow-400"
                        style={{
                            width: `${(elite / players.length) * 100}%`,
                        }}
                    />

                    <div
                        className="bg-sky-400"
                        style={{
                            width: `${(good / players.length) * 100}%`,
                        }}
                    />

                    <div
                        className="bg-slate-500"
                        style={{
                            width: `${(average / players.length) * 100}%`,
                        }}
                    />

                </div>

            </div>

            {/* Players */}

            <div className="space-y-3">

                {players.map((player) => (

                    <TeamPlayer
                        key={player.name}
                        player={player}
                    />

                ))}

            </div>

        </Card>

    );

}