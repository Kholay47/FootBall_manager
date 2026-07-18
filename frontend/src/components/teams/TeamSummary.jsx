import {
    FaFutbol,
    FaTrophy,
    FaUsers,
} from "react-icons/fa";

export default function TeamSummary({

    teamName,

    strength,

    players,

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

    return (

        <div
            className="
                mb-8
                rounded-2xl
                border
                border-slate-800
                bg-gradient-to-r
                from-slate-900
                via-slate-900
                to-slate-800
                p-6
            "
        >

            {/* Header */}

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                {/* Left */}

                <div className="flex items-center gap-4">

                    <div
                        className="
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-emerald-500
                            to-green-600
                            text-2xl
                            text-white
                            shadow-lg
                            shadow-emerald-500/20
                        "
                    >
                        <FaFutbol />
                    </div>

                    <div>

                        <h2 className="text-3xl font-bold text-white">

                            {teamName}

                        </h2>

                        <div className="mt-2 flex items-center gap-4 text-sm text-slate-400">

                            <span className="flex items-center gap-2">

                                <FaUsers />

                                {players.length} Players

                            </span>

                            <span>

                                Elite: {elite}

                            </span>

                            <span>

                                Good: {good}

                            </span>

                            <span>

                                Average: {average}

                            </span>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="text-center lg:text-right">

                    <div className="flex items-center justify-center gap-2 text-yellow-400 lg:justify-end">

                        <FaTrophy />

                        <span className="text-sm uppercase tracking-wider">

                            Team Strength

                        </span>

                    </div>

                    <h1 className="mt-2 text-5xl font-extrabold text-emerald-400">

                        {strength}

                    </h1>

                </div>

            </div>

        </div>

    );

}