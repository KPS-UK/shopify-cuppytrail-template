import { Competition } from "@prisma/client";
import prisma from "app/db.server";
import { authenticate } from "app/shopify.server"
import { ModelProp } from "app/types/ModelProp";
import GenericCrudApiEndpoint from "app/lib/GenericCrudApiEndpoint";

export const competitionProps: ModelProp<Competition>[] = [
    { name: "name", label: "Name", type: "text" },
    { name: "shortName", label: "Short Name", type: "text" },
    { name: "countryIso", label: "Country", type: "select", options: ["GB", "US", "FR", "DE", "ES", "IT"] },
]

const crudEndpoint: GenericCrudApiEndpoint<Competition> = new GenericCrudApiEndpoint<Competition>(
    "competition",
    competitionProps,
    prisma,
    authenticate
);

export async function loader({ request }: { request: Request }) {
    return await crudEndpoint.loader(request);
}

export async function action({ request }: { request: Request }) {
    return await crudEndpoint.action(request);
}
