import type {StackFilter} from "../../stack_toggle/StackToggle.tsx";
import type {IconItem} from "../IconItem.ts";
import {PostgresIcon} from "@/components/tech_cards/databases/PostgresIcon";
import {DynamoDBIcon} from "@/components/tech_cards/databases/DynamoDBIcon";
import {OracleIcon} from "@/components/tech_cards/databases/OracleIcon";
import {IconGridSection} from "@/components/tech_cards/icon_grid/IconGridSection";


const FILTERED_DATASTORES: Partial<Record<StackFilter, IconItem[]>> = {
    backend: [
        { key: "postgres", label: "PostgreSQL", isPrimary: true, startYear: 2021, Icon: PostgresIcon },
        { key: "dynamodb", label: "DynamoDB", startYear: 2024, Icon: DynamoDBIcon },
        { key: "oracle", label: "Oracle", startYear: 2022, Icon: OracleIcon },
    ],
    data: [
        { key: "postgres", label: "PostgreSQL", isPrimary: true, startYear: 2021, Icon: PostgresIcon },
        { key: "dynamodb", label: "DynamoDB", startYear: 2024, Icon: DynamoDBIcon },
        { key: "oracle", label: "Oracle", startYear: 2022, Icon: OracleIcon },
    ],
};

export default function DatastoresCard({filter}: { filter: StackFilter}) {
    return (
        <>
            {FILTERED_DATASTORES[filter] && FILTERED_DATASTORES[filter].length > 0 && (
                <IconGridSection
                    title="Datastores"
                    items={FILTERED_DATASTORES[filter] ?? []}
                />
            )}
        </>
    );
}