import Card from "../common/Card";

import TeamPlayer from "./TeamPlayer";
import TeamSummary from "./TeamSummary";

export default function TeamCard({
    title,
    players,
    strength,
}) {
    return (

        <Card>

            <TeamSummary
                teamName={title}
                strength={strength}
                players={players}
            />

            <div className="space-y-3">

                {players.map((player) => (

                    <TeamPlayer
                        key={player.name}
                        player={player}
                    />

                ))}

            </div>

        </Card>

    );
}