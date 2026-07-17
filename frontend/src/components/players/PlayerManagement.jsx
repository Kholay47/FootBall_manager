import { useMemo, useState } from "react";

import PlayerToolbar from "./PlayerToolbar";
import PlayerTable from "./PlayerTable";

import AddPlayerModal from "./AddPlayerModal";
import EditPlayerModal from "./EditPlayerModal";
import DeletePlayerModal from "./DeletePlayerModal";

export default function PlayerManagement({

    players,

    loading,

    error,

    create,

    edit,

    remove,

    toggle,

}) {

    const [search, setSearch] = useState("");

    const [addOpen, setAddOpen] = useState(false);

    const [editPlayer, setEditPlayer] = useState(null);

    const [deletePlayer, setDeletePlayer] = useState(null);

    const filteredPlayers = useMemo(() => {

        return players.filter((player) =>
            player.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    }, [players, search]);

    return (
        <section className="mt-10">

            <PlayerToolbar
                search={search}
                setSearch={setSearch}
                onAdd={() => setAddOpen(true)}
            />

            <PlayerTable
                players={filteredPlayers}
                loading={loading}
                error={error}
                onEdit={setEditPlayer}
                onDelete={setDeletePlayer}
                onToggle={(player) =>
                    toggle(
                        player.name,
                        player.available
                    )
                }
            />

            <AddPlayerModal
                open={addOpen}
                onClose={() => setAddOpen(false)}
                onSubmit={async (player) => {
                    await create(player);
                    setAddOpen(false);
                }}
            />

            <EditPlayerModal
                open={Boolean(editPlayer)}
                player={editPlayer}
                onClose={() => setEditPlayer(null)}
                onSubmit={async (player) => {
                    await edit(editPlayer.name, player);
                    setEditPlayer(null);
                }}
            />

            <DeletePlayerModal
                open={Boolean(deletePlayer)}
                player={deletePlayer}
                onClose={() => setDeletePlayer(null)}
                onDelete={async (player) => {
                    await remove(player.name);
                    setDeletePlayer(null);
                }}
            />

        </section>
    );
}