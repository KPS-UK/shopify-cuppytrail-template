import prisma from "app/db.server";
import { useLoaderData } from "react-router";
import { Competition, Team } from "@prisma/client";

// Define a type that includes the related competition data
type TeamWithIncludes = Team & {
    competition: Competition;
}

// Loader function to fetch teams with their competitions
export const loader = async () => {
  const teams = await prisma.team.findMany({
    include: { competition: true },
  });
  return Response.json(teams || []);
};

// React component to display the teams
export default function Teams() {
    const teams = useLoaderData<TeamWithIncludes[]>();

    const createTeam = () => {
        //TODO
    }

    return (
        <s-page heading="Teams">
            <s-button slot="primary-action" onClick={createTeam}>
                Create Team
            </s-button>

            <s-section heading="Introduction">
                <s-paragraph>
                    This is the Teams page where you can view all the teams participating in various competitions.
                </s-paragraph>
            </s-section>

            <s-section heading="Teams List">
                <s-table>
                    <s-table-header-row>
                        <s-table-header>Team Name</s-table-header>
                        <s-table-header>Short Name</s-table-header>
                        <s-table-header>Country</s-table-header>
                        <s-table-header>Competition</s-table-header>
                    </s-table-header-row>
                    <s-table-body>
                        {teams.map((team) => (
                            <s-table-row key={team.id}>
                                <s-table-cell>{team.name}</s-table-cell>
                                <s-table-cell>{team.shortName}</s-table-cell>
                                <s-table-cell>{team.countryIso}</s-table-cell>
                                <s-table-cell>{team.competition.name}</s-table-cell>
                            </s-table-row>
                        ))}
                    </s-table-body>
                </s-table>
            </s-section>
        </s-page>
    )
}