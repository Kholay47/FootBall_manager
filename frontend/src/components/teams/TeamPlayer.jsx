import { FaCheckCircle } from "react-icons/fa";

import TierBadge from "../players/TierBadge";

export default function TeamPlayer({ player }) {

    const initial = player.name.charAt(0).toUpperCase();

    return (

        <div
            className="
                group
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                px-5
                py-4
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-emerald-500/40
                hover:bg-slate-800
                hover:shadow-lg
                hover:shadow-emerald-500/10
            "
        >

            {/* Left */}

            <div className="flex items-center gap-4">

                {/* Avatar */}

                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-br
                        from-emerald-500
                        to-green-600
                        text-lg
                        font-bold
                        text-white
                        shadow-md
                    "
                >
                    {initial}
                </div>

                {/* Details */}

                <div>

                    <h4
                        className="
                            text-lg
                            font-semibold
                            text-white
                            transition-colors
                            duration-300
                            group-hover:text-emerald-400
                        "
                    >
                        {player.name}
                    </h4>

                    <div className="mt-1 flex items-center gap-3">

                        <span
                            className="
                                rounded-full
                                bg-slate-800
                                px-2
                                py-1
                                text-xs
                                text-slate-300
                            "
                        >
                            Rank #{player.rank}
                        </span>

                        {player.available && (

                            <span
                                className="
                                    flex
                                    items-center
                                    gap-1
                                    text-xs
                                    text-emerald-400
                                "
                            >
                                <FaCheckCircle />

                                Available

                            </span>

                        )}

                    </div>

                </div>

            </div>

            {/* Right */}

            <TierBadge tier={player.tier} />

        </div>

    );

}