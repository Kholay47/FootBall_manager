import { useState } from "react";

import PlayerToolbar from "./PlayerToolbar";
import PlayerTable from "./PlayerTable";

import AddPlayerModal from "./AddPlayerModal";
import EditPlayerModal from "./EditPlayerModal";
import DeletePlayerModal from "./DeletePlayerModal";

export default function PlayerManagement({

  players,
  loading,
  error,
  search,
  setSearch,
  create,
  edit,
  remove,
  toggle,
  totalPlayers,

}) {

    const [addOpen, setAddOpen] = useState(false);

    const [editPlayer, setEditPlayer] = useState(null);

    const [deletePlayer, setDeletePlayer] = useState(null);

    // ===========================================
    // Handlers
    // ===========================================

    async function handleCreate(player) {

        await create(player);

        setAddOpen(false);

    }

    async function handleEdit(player) {

        await edit(

            editPlayer.name,

            player,

        );

        setEditPlayer(null);

    }

    async function handleDelete() {

        await remove(

            deletePlayer.name,

        );

        setDeletePlayer(null);

    }

    async function handleToggle(player) {

        await toggle(player);

    }

    // ===========================================

    return (

        <section className="mt-10 space-y-6">

            <PlayerToolbar

              search={search}
              setSearch={setSearch}
              totalPlayers={totalPlayers}
              onAdd={() => setAddOpen(true)}

            />

            <PlayerTable

                players={players}

                loading={loading}

                error={error}

                onEdit={setEditPlayer}

                onDelete={setDeletePlayer}

                onToggle={handleToggle}

            />

            <AddPlayerModal

                open={addOpen}

                onClose={() => setAddOpen(false)}

                onSubmit={handleCreate}

            />

            <EditPlayerModal

                open={Boolean(editPlayer)}

                player={editPlayer}

                onClose={() => setEditPlayer(null)}

                onSubmit={handleEdit}

            />

            <DeletePlayerModal

                open={Boolean(deletePlayer)}

                player={deletePlayer}

                onClose={() => setDeletePlayer(null)}

                onDelete={handleDelete}

            />

        </section>

    );

}