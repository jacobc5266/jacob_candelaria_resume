import { JavaScriptIcon } from "./JavaScriptIcon";
import { ReactIcon } from "./ReactIcon";
import { NextjsIcon } from "./NextjsIcon";
import { TypeScriptIcon } from "./TypeScriptIcon";
import { HtmlIcon } from "./HtmlIcon";
import { CssIcon } from "./CssIcon";
import type {IconItem} from "../IconItem.ts";
import {IconGridSection} from "@/components/tech_cards/icon_grid/IconGridSection";

const FRONTEND_LANGUAGES: IconItem[] = [
    { key: "javascript", label: "JavaScript", startYear: 2025, Icon: JavaScriptIcon },
    { key: "react", label: "React", startYear: 2025, Icon: ReactIcon },
    { key: "nextjs", label: "Next.js", startYear: 2025, Icon: NextjsIcon },
    { key: "typescript", label: "TypeScript", startYear: 2025, Icon: TypeScriptIcon },
    { key: "html", label: "HTML", startYear: 2023, Icon: HtmlIcon },
    { key: "css", label: "CSS", startYear: 2023, Icon: CssIcon },
];

export default function FrontendCard() {
    return (
        <IconGridSection
            title="Frontend"
            note={
                <p>
                    While my primary focus and professional identity is backend engineering, I’m comfortable
                    working across the frontend stack to build complete, production-ready applications.
                </p>
            }
            items={FRONTEND_LANGUAGES}
        />
    );
}
