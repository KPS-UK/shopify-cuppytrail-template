import prisma from "app/db.server";
import { useLoaderData } from "react-router";
import { Competition } from "@prisma/client";
import FormModal from "app/components/modals/FormModal";
import { competitionProps } from "./api.competitions";

// Loader function to fetch players with their team
export const loader = async () => {
  const competitions = await prisma.competition.findMany();
  return Response.json(competitions || []);
};

// React component to display the teams
export default function Competitions() {
    const competitions = useLoaderData<Competition[]>();

    return (
        <s-page heading="Competitions">
            <s-button slot="primary-action" commandFor={`competitionModal`}>
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
            <FormModal title="Create Competition" type="competition" button="Save Competition" attributes={competitionProps} action="/api/competitions" />
        </s-page>
    )
}