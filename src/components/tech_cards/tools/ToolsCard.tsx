import type { StackFilter } from "../../stack_toggle/StackToggle.tsx";
import type {IconItem} from "../IconItem.ts";
import {GitIcon} from "@/components/tech_cards/tools/GitIcon";
import {GitHubIcon} from "@/components/tech_cards/tools/GitHubIcon";
import {DockerIcon} from "@/components/tech_cards/tools/DockerIcon";
import {SpringIcon} from "@/components/tech_cards/tools/SpringIcon";
import {JooqIcon} from "@/components/tech_cards/tools/JooqIcon";
import {PostmanIcon} from "@/components/tech_cards/tools/PostmanIcon";
import {GradleIcon} from "@/components/tech_cards/tools/GradleIcon";
import {JUnitIcon} from "@/components/tech_cards/tools/JUnitIcon";
import {PytestIcon} from "@/components/tech_cards/tools/PytestIcon";
import {OpenApiIcon} from "@/components/tech_cards/tools/OpenApiIcon";
import {SwaggerIcon} from "@/components/tech_cards/tools/SwaggerIcon";
import {JupyterIcon} from "@/components/tech_cards/data/JupyterIcon";
import {PlotlyIcon} from "@/components/tech_cards/data/PlotlyIcon";
import {MatplotlibIcon} from "@/components/tech_cards/data/MatplotlibIcon";
import {PandasIcon} from "@/components/tech_cards/data/PandasIcon";
import {ScikitLearnIcon} from "@/components/tech_cards/data/ScikitLearnIcon";
import {IconGridSection} from "@/components/tech_cards/icon_grid/IconGridSection";



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
