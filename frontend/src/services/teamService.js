import { api } from "./api";

export function generateTeams() {
    return api("/teams/generate", {
        method: "POST",
    });
}