import { Player } from "@prisma/client";
import prisma from "app/db.server";
import { authenticate } from "app/shopify.server"
import { ModelProp } from "app/types/ModelProp";
import GenericCrudApiEndpoint from "app/lib/GenericCrudApiEndpoint";

export const playerProps: ModelProp<Player>[] = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "nationality", label: "Nationality", type: "select", options: ["GB", "US", "FR", "DE", "ES", "IT"] },
    { name: "teamId", label: "Team", type: "model", modelType: "team", modelLabelKey: "name" },
]

const crudEndpoint: GenericCrudApiEndpoint<Player> = new GenericCrudApiEndpoint<Player>(
    "player",
    playerProps,
    prisma,
    authenticate
);

export async function loader({ request }: { request: Request }) {
    return await crudEndpoint.loader(request);
}

export async function action({ request }: { request: Request }) {
    return await crudEndpoint.action(request);
}
