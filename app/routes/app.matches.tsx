import prisma from "app/db.server";
import { useLoaderData } from "react-router";
import { Match, Team } from "@prisma/client";

// Define a type that includes the related team data
type MatchesWithIncludes = Match & {
    homeTeam: Team;
    awayTeam: Team;
}

// Loader function to fetch players with their team
export const loader = async () => {
  const matches = await prisma.match.findMany({
    include: { homeTeam: true, awayTeam: true },
  });
  return Response.json(matches || []);
};

// React component to display the teams
export default function Matches() {
    const matches = useLoaderData<MatchesWithIncludes[]>();

    const createMatch = () => {
        //TODO
    }

    return (
        <s-page heading="Matches">
            <s-button slot="primary-action" onClick={createMatch}>
                Create Match
            </s-button>

            <s-section heading="Introduction">
                <s-paragraph>
                    This is the Matches page where you can view all the matches taking place in various competitions.
                </s-paragraph>
            </s-section>

            <s-section heading="Matches List">
                <s-table>
                    <s-table-header-row>
                        <s-table-header>Home Team</s-table-header>
                        <s-table-header>Away Team</s-table-header>
                        <s-table-header>Date</s-table-header>
                    </s-table-header-row>
                    <s-table-body>
                        {matches.map((match) => (
                            <s-table-row key={match.id}>
                                <s-table-cell>{match.homeTeam.name}</s-table-cell>
                                <s-table-cell>{match.awayTeam.name}</s-table-cell>
                                <s-table-cell>{String(match.date)}</s-table-cell>
                            </s-table-row>
                        ))}
                    </s-table-body>
                </s-table>
            </s-section>
        </s-page>
    )
}