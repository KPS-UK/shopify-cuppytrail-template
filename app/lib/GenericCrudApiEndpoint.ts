/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { ModelProp } from "../types/ModelProp.js";

type Authenticate = {
    admin: (request: Request) => any;
}

export default class GenericCrudApiEndpoint<T> {
    modelProps : ModelProp<T>[];
    type: keyof PrismaClient;
    prisma: PrismaClient;
    authenticate: Authenticate;

    constructor(type : keyof PrismaClient, modelProps: ModelProp<T>[], prisma: PrismaClient, authenticate: Authenticate) {
        this.modelProps = modelProps;
        this.type = type;
        this.prisma = prisma;
        this.authenticate = authenticate;
    }

    async loader(request: Request) : Promise<Response> {
        await this.authenticate.admin(request);
        return await this.#GET();
    }

    async action(request: Request) : Promise<Response> {
        await this.authenticate.admin(request);
        switch (request.method) {
            case "POST":
                return this.#POST(request);
            case "PUT":
                return this.#PUT(request);
            case "DELETE":
                return this.#DELETE(request);
            case "GET":
            default:
                return this.#GET();
        }
    }

    async #POST(request: Request) : Promise<Response> {
        const formData = await request.formData();
        const data: any = {};
        this.modelProps.forEach((prop) => {
            const value = formData.get(prop.name as string);
            if (value !== null) {
                if (prop.type === "number" || prop.type === "model"){
                    data[prop.name as string] = parseInt(value as string);
                } else {
                    data[prop.name as string] = value;
                }
            }
        });

        const createdRecord = await (this.prisma[this.type] as any).create({
            data,
        });

        return Response.json(createdRecord);
    }

    async #PUT(request: Request) : Promise<Response> {
        const formData = await request.formData();
        const data: any = {};
        let id: any = null;
        this.modelProps.forEach((prop) => {
            const value = formData.get(prop.name as string);
            if (prop.name === "id") {
                id = parseInt(value as string);
            } else if (value !== null) {
                if (prop.type === "number" || prop.type === "model"){
                    data[prop.name as string] = parseInt(value as string);
                } else {
                    data[prop.name as string] = value;
                }
            }
        });

        if (!id) {
            return Response.json({ error: "ID is required for update" }, { status: 400 });
        }

        const updatedRecord = await (this.prisma[this.type] as any).update({
            where: { id },
            data,
        });

        return Response.json(updatedRecord);
    }

    async #DELETE(request: Request) : Promise<Response> {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return Response.json({ error: "ID is required for deletion" }, { status: 400 });
        }

        const deletedRecord = await (this.prisma[this.type] as any).delete({
            where: { id },
        });

        return Response.json(deletedRecord);
    }

    async #GET() : Promise<Response> {
        const partners = await (this.prisma[this.type] as any).findMany();
        return Response.json(partners || []);
    }
}