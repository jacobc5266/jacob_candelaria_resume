import * as React from "react";
import classes from "../TechCard.module.css";
import type { StackFilter } from "../../stack_toggle/StackToggle.tsx";

import { GitIcon } from "./GitIcon.tsx";
import { GitHubIcon } from "./GitHubIcon.tsx";
import { DockerIcon } from "./DockerIcon.tsx";
import { PostmanIcon } from "./PostmanIcon.tsx";
import { GradleIcon } from "./GradleIcon.tsx";

import { PostgresIcon } from "../databases/PostgresIcon.tsx";
import { DynamoDBIcon } from "../databases/DynamoDBIcon.tsx";
import { OracleIcon } from "../databases/OracleIcon.tsx";

import { PlotlyIcon } from "../data/PlotlyIcon.tsx";
import { MatplotlibIcon } from "../data/MatplotlibIcon.tsx";
import { PandasIcon } from "../data/PandasIcon.tsx";
import { JupyterIcon } from "../data/JupyterIcon.tsx";
import { ScikitLearnIcon } from "../data/ScikitLearnIcon.tsx";

import Container from "../../container/Container.tsx";
import {OpenApiIcon} from "./OpenApiIcon.tsx";
import {SwaggerIcon} from "./SwaggerIcon.tsx";
import {SpringIcon} from "./SpringIcon.tsx";
import {PytestIcon} from "./PytestIcon.tsx";
import {JUnitIcon} from "./JUnitIcon.tsx";
import {JooqIcon} from "./JooqIcon.tsx";

type Item = {
    key: string;
    label?: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const ALWAYS_TOOLS: Item[] = [
    { key: "git", label: "Git", Icon: GitIcon },
    { key: "github", label: "GitHub", Icon: GitHubIcon },
    { key: "docker", label: "Docker", Icon: DockerIcon },
];

const FILTERED_TOOLS: Record<StackFilter, Item[]> = {
    backend: [
        { key: "spring", label: "Spring", Icon: SpringIcon },
        { key: "jooq", label: "JOOQ", Icon: JooqIcon},
        { key: "postman", label: "Postman", Icon: PostmanIcon },
        { key: "gradle", label: "Gradle", Icon: GradleIcon },
        {key: "junit", label: "JUnit", Icon: JUnitIcon},
        { key: "pytest", label: "Pytest", Icon: PytestIcon },
        { key: "openapi", label: "OpenAPI", Icon: OpenApiIcon },
        { key: "swagger", label: "Swagger", Icon: SwaggerIcon}
    ],
    frontend: [
        { key: "postman", label: "Postman", Icon: PostmanIcon },
    ],
    data: [
        { key: "jupyter", label: "Jupyter", Icon: JupyterIcon },
        { key: "plotly", label: "Plotly", Icon: PlotlyIcon },
        { key: "matplotlib", label: "Matplotlib", Icon: MatplotlibIcon },
        { key: "pandas", label: "Pandas", Icon: PandasIcon },
        { key: "pytest", label: "Pytest", Icon: PytestIcon },
        { key: "scikitlearn", label: "Scikit-learn", Icon: ScikitLearnIcon },
    ],
};

const FILTERED_DATASTORES: Partial<Record<StackFilter, Item[]>> = {
    backend: [
        { key: "postgres", label: "PostgreSQL", Icon: PostgresIcon },
        { key: "dynamodb", label: "DynamoDB", Icon: DynamoDBIcon },
        { key: "oracle", label: "Oracle", Icon: OracleIcon },
    ],
    data: [
        { key: "postgres", label: "PostgreSQL", Icon: PostgresIcon },
        { key: "dynamodb", label: "DynamoDB", Icon: DynamoDBIcon },
        { key: "oracle", label: "Oracle", Icon: OracleIcon },
    ],
};

function dedupe(items: Item[]) {
    return Array.from(new Map(items.map((i) => [i.key, i])).values());
}

export function ToolsContainer({ filter }: { filter: StackFilter }) {
    const tools = dedupe([...ALWAYS_TOOLS, ...(FILTERED_TOOLS[filter] ?? [])]);
    const datastores = FILTERED_DATASTORES[filter]; // undefined for frontend

    return (
        <div className={classes.languages_card}>
            {/* Datastores only for backend + data */}
            {datastores && datastores.length > 0 && (
                <div>
                    <div>
                        <h2>Datastores</h2>
                    </div>
                    <Container>
                        <div className={classes.language_row}>
                            {datastores.map(({ key, label, Icon }) => (
                                <Container key={key}>
                                    <Icon width={75} height={75} />
                                    {label && <p>{label}</p>}
                                </Container>
                            ))}
                        </div>
                    </Container>
                </div>
            )}

            {/* Tools always */}
            <div>
                <div>
                    <h2>Tools</h2>
                </div>

                <Container>
                    <div className={classes.language_row}>
                        {tools.map(({ key, label, Icon }) => (
                            <Container key={key}>
                                <Icon width={75} height={75} />
                                {label && <p>{label}</p>}
                            </Container>
                        ))}
                    </div>
                </Container>
            </div>
        </div>
    );
}
