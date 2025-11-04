import prisma from "app/db.server";
import { useLoaderData } from "react-router";
import { Competition } from "@prisma/client";

// Loader function to fetch players with their team
export const loader = async () => {
  const matches = await prisma.competition.findMany();
  return Response.json(matches || []);
};

// React component to display the teams
export default function Competitions() {
    const competitions = useLoaderData<Competition[]>();

    const createCompetition = () => {
        //TODO
    }

    return (
        <s-page heading="Competitions">
            <s-button slot="primary-action" onClick={createCompetition}>
                Create Competition
            </s-button>

            <s-section heading="Introduction">
                <s-paragraph>
                    This is the Competitions page where you can view all the competitions taking place.
                </s-paragraph>
            </s-section>

            <s-section heading="Competitions List">
                <s-table>
                    <s-table-header-row>
                        <s-table-header>Name</s-table-header>
                        <s-table-header>Short Name</s-table-header>
                        <s-table-header>Country</s-table-header>
                    </s-table-header-row>
                    <s-table-body>
                        {competitions.map((competition) => (
                            <s-table-row key={competition.id}>
                                <s-table-cell>{competition.name}</s-table-cell>
                                <s-table-cell>{competition.shortName}</s-table-cell>
                                <s-table-cell>{competition.countryIso}</s-table-cell>
                            </s-table-row>
                        ))}
                    </s-table-body>
                </s-table>
            </s-section>
        </s-page>
    )
}