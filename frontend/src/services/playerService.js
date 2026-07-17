import { api } from "./api";

/* ----------------------------- */
/* GET                           */
/* ----------------------------- */

export function getPlayers() {
    return api("/players");
}

/* ----------------------------- */
/* POST                          */
/* ----------------------------- */

export function addPlayer(player) {
    return api("/players", {
        method: "POST",
        body: player,
    });
}

/* ----------------------------- */
/* PUT                           */
/* ----------------------------- */

export function updatePlayer(
    playerName,
    updatedPlayer
) {
    return api(
        `/players/${encodeURIComponent(playerName)}`,
        {
            method: "PUT",
            body: updatedPlayer,
        }
    );
}

/* ----------------------------- */
/* DELETE                        */
/* ----------------------------- */

export function deletePlayer(playerName) {
    return api(
        `/players/${encodeURIComponent(playerName)}`,
        {
            method: "DELETE",
        }
    );
}

/* ----------------------------- */
/* PATCH                         */
/* ----------------------------- */

export function toggleAvailability(
    playerName,
    available
) {
    return api(
        `/players/${encodeURIComponent(playerName)}/availability`,
        {
            method: "PATCH",
            body: {
                available,
            },
        }
    );
}