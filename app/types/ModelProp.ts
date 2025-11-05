import { PrismaClient } from "@prisma/client/extension";

export type ModelProp<T> = {
    name: keyof T;
    type: "text" | "number" | "date" | "select" | "model";
    label: string;
    options?: string[]; // For select type
    modelType?: keyof PrismaClient;
    modelLabelKey?: string;
    array?: boolean;
}