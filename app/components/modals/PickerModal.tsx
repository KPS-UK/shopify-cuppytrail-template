/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client/extension";
import { useEffect, useState } from "react";

type PickerModalProps<T> = {
    title: string;
    value: T | T[] | undefined;
    multi?: boolean;
    update: (value: T | T[] | undefined) => void;
    type: keyof PrismaClient
    displayKey: keyof T;
    valueKey: keyof T;
    form?: React.ReactNode;
};

export function PickerModal<T>({
    title, 
    value, 
    multi, 
    update, 
    type,
    displayKey, 
    valueKey,
    form
}: PickerModalProps<T>) {

    const [options, setOptions] = useState<T[]>([]);
    
    useEffect(() => {
        fetch(`/api/${String(type)}s`).then(async (response) => {
            const json = await response.json();
            setOptions(json);
        });
    }, [type]);

    const [selectedItems, setSelectedItems] = useState<T[]>(() => {
        if (multi) {
            return Array.isArray(value) ? value : value ? [value] : [];
        } else {
            return value ? [value as T] : [];
        }
    });

    const handleItemToggle = (item: T) => {
        if (multi) {
            const isSelected = selectedItems.some(selected => 
                selected[valueKey] === item[valueKey]
            );
            
            if (isSelected) {
                const newSelection = selectedItems.filter(selected => 
                    selected[valueKey] !== item[valueKey]
                );
                setSelectedItems(newSelection);
            } else {
                const newSelection = [...selectedItems, item];
                setSelectedItems(newSelection);
            }
        } else {
            update(item || undefined);
        }
    };

    const handleSubmit = () => {
        if (multi) {
            update(selectedItems);
        }
    };

    const handleClear = () => {
        update(undefined);
    }

    const isSelected = (item: T) => {
        return selectedItems.some(selected => 
            selected[valueKey] === item[valueKey]
        );
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <div className="flex flex-row">
                <s-text type="strong">{title}: </s-text>
                <s-text>{options.find(({id} : any) => id === value)?.[displayKey] as string || 'NONE'}</s-text>
            </div>
            <s-button commandFor={`${title}Modal`}>
                <s-icon type="edit" />
            </s-button>
            <s-modal id={`${title}Modal`} heading={`Select ${title}`}>
                {form}
                <s-table>
                    <s-table-header-row>
                        {multi && <s-table-header>Select</s-table-header>}
                        <s-table-header>{String(displayKey)}</s-table-header>
                        {!multi && <s-table-header>Action</s-table-header>}
                    </s-table-header-row>
                    <s-table-body>
                        {options.map((item) => (
                            <s-table-row key={String(item[valueKey])}>
                                {multi && (
                                    <s-table-cell>
                                        <input
                                            type="checkbox"
                                            checked={isSelected(item)}
                                            onChange={() => handleItemToggle(item)}
                                        />
                                    </s-table-cell>
                                )}
                                <s-table-cell>{String(item[displayKey])}</s-table-cell>
                                {!multi && (
                                    <s-table-cell>
                                        <s-button
                                            variant="primary"
                                            commandFor={`${title}Modal`}
                                            command="--hide"
                                            onClick={() => {
                                                handleItemToggle(item);
                                                handleSubmit();
                                            }}
                                        >
                                            Select
                                        </s-button>
                                    </s-table-cell>
                                )}
                            </s-table-row>
                        ))}
                    </s-table-body>
                </s-table>

                {!multi && value && (
                    <s-button
                        slot="primary-action"
                        variant="primary"
                        commandFor={`${title}Modal`}
                        command="--hide"
                        onClick={handleClear}
                    >
                        Clear
                    </s-button>
                )}
                <s-button slot="secondary-actions" commandFor={`${title}Modal`} command="--hide">
                    Close
                </s-button>
                {multi && (
                    <s-button
                        slot="primary-action"
                        variant="primary"
                        commandFor={`${title}Modal`}
                        command="--hide"
                        onClick={handleSubmit}
                    >
                        {multi ? `Save (${selectedItems.length} selected)` : 'Save'}
                    </s-button>
                )}
            </s-modal>
        </div>
    );
}