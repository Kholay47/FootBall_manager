import TierBadge from "../players/TierBadge";

export default function TeamPlayer({ player }) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">

            <div>
                <h4 className="font-medium text-white">
                    {player.name}
                </h4>

                <p className="text-sm text-slate-400">
                    Rank: {player.rank}
                </p>
            </div>

            <TierBadge tier={player.tier} />

        </div>
    );
}