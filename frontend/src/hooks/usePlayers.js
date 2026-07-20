import { useCallback, useEffect, useState } from "react";

import {
    getPlayers,
    addPlayer,
    updatePlayer,
    deletePlayer,
    toggleAvailability,
} from "../services/playerService";

const TIER_ORDER = {
    Elite: 0,
    Good: 1,
    Average: 2,
};

export default function usePlayers() {
    const [players, setPlayers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    /* ====================================== */
    /* Load Players                           */
    /* ====================================== */

    const refresh = useCallback(async () => {
        try {
            setLoading(true);

            setError(null);

            const data = await getPlayers();

            data.sort((a, b) => {
                if (a.tier !== b.tier) {
                    return TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
                }

                return a.rank - b.rank;
            });

            setPlayers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        async function loadPlayers() {
            try {
                setLoading(true);

                setError(null);

                const data = await getPlayers();

                data.sort((a, b) => {
                    if (a.tier !== b.tier) {
                        return TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
                    }

                    return a.rank - b.rank;
                });

                setPlayers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        void loadPlayers();
    }, []);

    /* ====================================== */
    /* Create                                 */
    /* ====================================== */

    async function create(player) {
        try {
            setError(null);

            const created = await addPlayer(player);

            await refresh();

            return created;
        } catch (err) {
            setError(err.message);

            throw err;
        }
    }

    /* ====================================== */
    /* Update                                 */
    /* ====================================== */

    async function edit(
        playerName,
        updatedPlayer,
    ) {
        try {
            setError(null);

            const updated = await updatePlayer(
                playerName,
                updatedPlayer,
            );

            await refresh();

            return updated;
        } catch (err) {
            setError(err.message);

            throw err;
        }
    }

    /* ====================================== */
    /* Delete                                 */
    /* ====================================== */

    async function remove(
        playerName,
    ) {
        try {
            setError(null);

            await deletePlayer(
                playerName,
            );

            await refresh();
        } catch (err) {
            setError(err.message);

            throw err;
        }
    }

    /* ====================================== */
    /* Toggle Availability                    */
    /* ====================================== */

    async function toggle(
        player,
    ) {
        try {
            setError(null);

            const updated = await toggleAvailability(
                player.name,
                !player.available,
            );

            setPlayers((current) =>
                current.map((p) =>
                    p.name === updated.name
                        ? updated
                        : p
                )
            );

            return updated;
        } catch (err) {
            setError(err.message);

            throw err;
        }
    }

    /* ====================================== */

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