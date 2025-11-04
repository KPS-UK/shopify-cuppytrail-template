import prisma from "app/db.server";
import { useLoaderData } from "react-router";
import { Player, Team } from "@prisma/client";

// Define a type that includes the related team data
type PlayersWithIncludes = Player & {
    team: Team;
}

// Loader function to fetch players with their team
export const loader = async () => {
  const players = await prisma.player.findMany({
    include: { team: true },
  });
  return Response.json(players || []);
};

// React component to display the teams
export default function Players() {
    const players = useLoaderData<PlayersWithIncludes[]>();

    const createPlayer = () => {
        //TODO
    }

    return (
        <s-page heading="Players">
            <s-button slot="primary-action" onClick={createPlayer}>
                Create Player
            </s-button>

            <s-section heading="Introduction">
                <s-paragraph>
                    This is the Players page where you can view all the players participating in various competitions.
                </s-paragraph>
            </s-section>

            <s-section heading="Players List">
                <s-table>
                    <s-table-header-row>
                        <s-table-header>Player Name</s-table-header>
                        <s-table-header>Team</s-table-header>
                        <s-table-header>Nationality</s-table-header>
                        <s-table-header>Team</s-table-header>
                    </s-table-header-row>
                    <s-table-body>
                        {players.map((player) => (
                            <s-table-row key={player.id}>
                                <s-table-cell>{player.firstName} {player.lastName}</s-table-cell>
                                <s-table-cell>{player.team.name}</s-table-cell>
                                <s-table-cell>{player.nationality}</s-table-cell>
                            </s-table-row>
                        ))}
                    </s-table-body>
                </s-table>
            </s-section>
        </s-page>
    )
}