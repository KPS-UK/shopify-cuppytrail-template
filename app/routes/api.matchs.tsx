import { Match } from "@prisma/client";
import prisma from "app/db.server";
import { authenticate } from "app/shopify.server"
import { ModelProp } from "app/types/ModelProp";
import GenericCrudApiEndpoint from "app/lib/GenericCrudApiEndpoint";

export const matchProps: ModelProp<Match>[] = [
    { name: "date", label: "Date", type: "date" },
    { name: "competitionId", label: "Competition", type: "model", modelType: "competition", modelLabelKey: "name" },
    { name: "homeTeamId", label: "Home Team", type: "model", modelType: "team", modelLabelKey: "name" },
    { name: "awayTeamId", label: "Away Team", type: "model", modelType: "team", modelLabelKey: "name" },
]

const crudEndpoint: GenericCrudApiEndpoint<Match> = new GenericCrudApiEndpoint<Match>(
    "match",
    matchProps,
    prisma,
    authenticate
);

export async function loader({ request }: { request: Request }) {
    return await crudEndpoint.loader(request);
}

export async function action({ request }: { request: Request }) {
    return await crudEndpoint.action(request);
}
