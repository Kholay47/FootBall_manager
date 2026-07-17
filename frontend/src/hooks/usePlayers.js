import { useCallback, useEffect, useState } from "react";

import {
    addPlayer,
    deletePlayer,
    getPlayers,
    toggleAvailability,
    updatePlayer,
} from "../services/playerService";

export default function usePlayers() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* ---------------------------------- */
    /* Load Players                       */
    /* ---------------------------------- */

    const refresh = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getPlayers();

            setPlayers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    /* ---------------------------------- */
    /* Create Player                      */
    /* ---------------------------------- */

    async function create(player) {
        setError(null);

        try {
            const created = await addPlayer(player);

            setPlayers((prev) => [...prev, created]);

            return created;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }

    /* ---------------------------------- */
    /* Update Player                      */
    /* ---------------------------------- */

    async function edit(playerName, updatedPlayer) {
        setError(null);

        try {
            const updated = await updatePlayer(
                playerName,
                updatedPlayer
            );

            setPlayers((prev) =>
                prev.map((player) =>
                    player.name === playerName
                        ? updated
                        : player
                )
            );

            return updated;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }

    /* ---------------------------------- */
    /* Delete Player                      */
    /* ---------------------------------- */

    async function remove(playerName) {
        setError(null);

        try {
            await deletePlayer(playerName);

            setPlayers((prev) =>
                prev.filter(
                    (player) =>
                        player.name !== playerName
                )
            );
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }

    /* ---------------------------------- */
    /* Toggle Availability                */
    /* ---------------------------------- */

    async function toggle(playerName, available) {
        setError(null);

        const previousPlayers = players;

        setPlayers((prev) =>
            prev.map((player) =>
                player.name === playerName
                    ? {
                          ...player,
                          available: !available,
                      }
                    : player
            )
        );

        try {
            const updated = await toggleAvailability(
                playerName,
                !available
            );

            setPlayers((prev) =>
                prev.map((player) =>
                    player.name === playerName
                        ? updated
                        : player
                )
            );
        } catch (err) {
            setPlayers(previousPlayers);
            setError(err.message);
        }
    }

    return {
        players,
        loading,
        error,

        refresh,

        create,

        edit,

        remove,

        toggle,
    };
}