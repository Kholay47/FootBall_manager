import { useMemo, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import SectionTitle from "../components/layout/SectionTitle";

import DashboardStats from "../components/dashboard/DashboardStats";

import PlayerManagement from "../components/players/PlayerManagement";

import GenerateButton from "../components/teams/GenerateButton";
import TeamComparison from "../components/teams/TeamComparison";

import usePlayers from "../hooks/usePlayers";
import useTeams from "../hooks/useTeams";

import { getPlayerStats } from "../utils/playerStats";

export default function Home() {

    // =====================================
    // Hooks
    // =====================================

    const {
        players,
        loading,
        error,
        create,
        edit,
        remove,
        toggle,
    } = usePlayers();

    const {
        teams,
        loading: teamsLoading,
        error: teamsError,
        generate,
    } = useTeams();

    // =====================================
    // UI State
    // =====================================

    const [search, setSearch] = useState("");

    // =====================================
    // Dashboard Stats
    // =====================================

    const stats = useMemo(() => {

        return getPlayerStats(players);

    }, [players]);

    // =====================================
    // Filter Players
    // =====================================

    const filteredPlayers = useMemo(() => {

        if (!search.trim()) {
            return players;
        }

        return players.filter((player) =>
            player.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    }, [players, search]);

    // =====================================
    // Player Handlers
    // =====================================

    async function handleCreate(player) {
        await create(player);
    }

    async function handleEdit(playerName, updatedPlayer) {
        await edit(playerName, updatedPlayer);
    }

    async function handleDelete(playerName) {

        const ok = window.confirm(
            `Delete "${playerName}" ?`
        );

        if (!ok) return;

        await remove(playerName);
    }

    async function handleToggle(player) {
        await toggle(player);
    }

    // =====================================
    // Team Generator
    // =====================================

    async function handleGenerate() {

        try {

            await generate();

        } catch (err) {

            console.error(err);

        }

    }

    // =====================================
    // Render
    // =====================================

    return (
        <>
            <Navbar />

            <Container>

                <SectionTitle
                    title="Dashboard"
                    subtitle="Overview of your football squad."
                />

                <DashboardStats
                    stats={stats}
                />

                <SectionTitle
                    title="Players"
                    subtitle="Manage players, availability and ratings."
                />

                <PlayerManagement
                    players={filteredPlayers}
                    loading={loading}
                    error={error}
                
                    search={search}
                    setSearch={setSearch}
                
                    create={handleCreate}
                    edit={handleEdit}
                    remove={handleDelete}
                    toggle={handleToggle}
                
                    totalPlayers={players.length}
                />

                <SectionTitle
                    title="Balanced Team Generator"
                    subtitle="Generate two evenly matched football teams."
                />

                <GenerateButton
                    loading={teamsLoading}
                    onGenerate={handleGenerate}
                />

                <TeamComparison
                    teams={teams}
                />

                {teamsError && (
                    <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                        {teamsError}
                    </div>
                )}

            </Container>
        </>
    );
}