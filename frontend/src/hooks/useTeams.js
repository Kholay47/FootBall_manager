import { useState } from "react";

import { generateTeams } from "../services/teamService";

export default function useTeams() {
    const [teams, setTeams] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    async function generate() {
        try {
            setLoading(true);
            setError(null);

            const result = await generateTeams();

            setTeams(result);

            return result;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function clear() {
        setTeams(null);
    }

    return {
        teams,

        loading,

        error,

        generate,

        clear,
    };
}