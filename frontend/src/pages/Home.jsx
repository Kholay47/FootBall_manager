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

    const stats = getPlayerStats(players);

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
                    players={players}
                    loading={loading}
                    error={error}
                    create={create}
                    edit={edit}
                    remove={remove}
                    toggle={toggle}
                />

                <SectionTitle
                    title="Balanced Team Generator"
                    subtitle="Generate two evenly matched football teams."
                />

                <GenerateButton
                    loading={teamsLoading}
                    onGenerate={generate}
                />

                <TeamComparison
                    teams={teams}
                />

                {teamsError && (
                    <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                        {teamsError}
                    </p>
                )}

            </Container>
        </>
    );
}