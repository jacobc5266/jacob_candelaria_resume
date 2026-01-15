import type { StackFilter } from "../../stack_toggle/StackToggle.tsx";

import { GitIcon } from "./GitIcon.tsx";
import { GitHubIcon } from "./GitHubIcon.tsx";
import { DockerIcon } from "./DockerIcon.tsx";
import { PostmanIcon } from "./PostmanIcon.tsx";
import { GradleIcon } from "./GradleIcon.tsx";

import { PlotlyIcon } from "../data/PlotlyIcon.tsx";
import { MatplotlibIcon } from "../data/MatplotlibIcon.tsx";
import { PandasIcon } from "../data/PandasIcon.tsx";
import { JupyterIcon } from "../data/JupyterIcon.tsx";
import { ScikitLearnIcon } from "../data/ScikitLearnIcon.tsx";

import {OpenApiIcon} from "./OpenApiIcon.tsx";
import {SwaggerIcon} from "./SwaggerIcon.tsx";
import {SpringIcon} from "./SpringIcon.tsx";
import {PytestIcon} from "./PytestIcon.tsx";
import {JUnitIcon} from "./JUnitIcon.tsx";
import {JooqIcon} from "./JooqIcon.tsx";
import type {IconItem} from "../IconItem.ts";
import {IconGridSection} from "../icon_grid/IconGridSection.tsx";



const ALWAYS_TOOLS: IconItem[] = [
    { key: "git", label: "Git", Icon: GitIcon },
    { key: "github", label: "GitHub", Icon: GitHubIcon },
    { key: "docker", label: "Docker", Icon: DockerIcon },
];

const FILTERED_TOOLS: Record<StackFilter, IconItem[]> = {
    backend: [
        { key: "spring", label: "Spring", Icon: SpringIcon },
        { key: "jooq", label: "jOOQ", Icon: JooqIcon},
        { key: "postman", label: "Postman", Icon: PostmanIcon },
        { key: "gradle", label: "Gradle", Icon: GradleIcon },
        {key: "junit", label: "JUnit", Icon: JUnitIcon},
        { key: "pytest", label: "Pytest", Icon: PytestIcon },
        { key: "openapi", label: "OpenAPI", Icon: OpenApiIcon },
        { key: "swagger", label: "Swagger", Icon: SwaggerIcon}
    ],
    frontend: [

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

function dedupe(items: IconItem[]) {
    return Array.from(new Map(items.map((i) => [i.key, i])).values());
}

export function ToolsCard({ filter }: { filter: StackFilter }) {
    const tools = dedupe([...ALWAYS_TOOLS, ...(FILTERED_TOOLS[filter] ?? [])]);

    return (
        <IconGridSection
            title="Tools"
            items={tools}
        />
    );
}
