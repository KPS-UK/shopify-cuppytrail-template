import { CallbackEvent } from "@shopify/polaris-types";
import { useState } from "react";
import { useFetcher } from "react-router";
import { ModelProp } from "../../types/ModelProp"
import { PickerModal } from "../modals/PickerModal";

export type GenericFormProps<T> = {
    title: string;
    button: string;
    attributes: ModelProp<T>[];
    type: string;
}

export default function GenericForm<T>({ attributes, title, button, type }: GenericFormProps<T>) {
    const fetcher = useFetcher();

    const [formData, setFormData] = useState(
        attributes.reduce((acc, attr) => {
            acc[attr.name as string] = attr.type === "select" ? attr.options![0] : "";
            return acc;
        }, {} as Record<string, any>)
    );

    const handleSubmit = async () => {
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataObj.append(key, value);
        });
        try {
            fetcher.submit(formDataObj, { method: "post", action: `/api/${type}s` });
            setFormData(attributes.reduce((acc, attr) => {
                acc[attr.name as string] = "";
                return acc;
            }, {} as Record<string, any>))
        } catch (error) {
            console.error("Form submission error:", error);
        }
    }

    return (
        <s-section heading={title}>
            <div className="flex flex-col gap-4">
                {attributes.map((attribute) => (
                    <FormField key={String(attribute.name)} setFormData={setFormData} attribute={attribute} formData={formData}/>
                ))}
                <div style={{ marginTop: '1rem' }}>
                    <s-button variant="primary" onClick={handleSubmit} commandFor={`${type}Modal`} command="--hide">
                        {button}
                    </s-button>
                </div>
            </div>
        </s-section>
    )
}

function FormField<T>({ attribute, formData, setFormData }: { attribute: ModelProp<T>; formData: Record<string, any>; setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>> }) {
    const updateFormData = (e: CallbackEvent<"s-text-field" | "s-number-field" | "s-date-field" | "s-select">) => {
        const target = e.target as HTMLInputElement;
        setFormData((prev) => ({ ...prev, [String(attribute.name)]: target.value }));
    }

    switch (attribute.type) {
        case "text":
            return (
                <s-text-field label={attribute.label} name={String(attribute.name)} onChange={updateFormData} />
            );
        case "number":
            return (
                <s-number-field label={attribute.label} name={String(attribute.name)} onChange={updateFormData} />
            );
        case "date":
            return (
                <s-date-field label={attribute.label} name={String(attribute.name)} onChange={updateFormData} />
            );
        case "select":
            return (
                <s-select label={attribute.label} name={String(attribute.name)} onChange={updateFormData}>
                    {attribute.options?.map((option) => (
                        <s-option key={option} value={option}>
                            {option}
                        </s-option>
                    ))}
                </s-select>
            );
        case "model":
            return (
                <PickerModal<T>
                    type={attribute.modelType!}
                    title={attribute.label}
                    label={`Select ${attribute.label}`}
                    value={formData[String(attribute.name)]}
                    multi={attribute.array || false}
                    displayKey={attribute.modelLabelKey as keyof T}
                    valueKey={"id" as keyof T}
                    form={null}
                    update={(obj : any) => {
                        setFormData((prev) => {
                            const newFormData = {
                                ...prev,
                            }
                            if (obj) {
                                newFormData[String(attribute.name)] = parseInt(obj.id);
                            } else {
                                delete newFormData[String(attribute.name)];
                            }
                            return newFormData;
                        })
                    }} />
            )
        default:
            return null;
    }
}