import Card from "../common/Card";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

import PlayerRow from "./PlayerRow";

export default function PlayerTable({

    players,

    loading,

    error,

    onEdit,

    onDelete,

    onToggle,

}) {

    if (loading)
        return <Loader text="Loading players..." />;

    if (error)
        return (
            <Card>
                <p className="text-red-400">
                    {error}
                </p>
            </Card>
        );

    if (!players.length)
        return (
            <Card>
                <EmptyState
                    title="No Players"
                    description="Add your first player."
                />
            </Card>
        );

    return (

        <Card className="overflow-hidden p-0">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="bg-slate-950 text-left text-slate-300">

                            <th className="px-6 py-4">
                                Name
                            </th>

                            <th className="px-6 py-4">
                                Tier
                            </th>

                            <th className="px-6 py-4">
                                Rank
                            </th>

                            <th className="px-6 py-4">
                                Available
                            </th>

                            <th className="px-6 py-4">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {players.map(player => (

                            <PlayerRow

                                key={player.name}

                                player={player}

                                onEdit={() => onEdit(player)}

                                onDelete={() => onDelete(player)}

                                onToggle={() => onToggle(player)}

                            />

                        ))}

                    </tbody>

                </table>

            </div>

        </Card>

    );

}