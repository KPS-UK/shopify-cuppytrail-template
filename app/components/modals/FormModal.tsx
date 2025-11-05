import { PrismaClient } from "@prisma/client";
import GenericForm, { GenericFormProps } from "../forms/GenericForm.js";
import { useEffect, useState } from "react";

type FormModalProps = {
    title : string;
    type : keyof PrismaClient;
}

export default function FormModal<T> ({ title, type, attributes, button }: FormModalProps & GenericFormProps<T> ) {
  return (
    <s-modal id={`${String(type)}Modal`} heading={title}>
        <GenericForm<T> title={title} button={button} attributes={attributes} type={type} />
    </s-modal>
  );
}