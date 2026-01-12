import classes from "../TechCard.module.css";
import Container from "../../container/Container.tsx";
import {JavaScriptIcon} from "./JavaScriptIcon.tsx";
import {ReactIcon} from "./ReactIcon.tsx";
import * as React from "react";
import {NextjsIcon} from "./NextjsIcon.tsx";
import {TypeScriptIcon} from "./TypeScriptIcon.tsx";
import {HtmlIcon} from "./HtmlIcon.tsx";
import {CssIcon} from "./CssIcon.tsx";

type Item = {
    key: string;
    label?: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const FRONTEND_LANGUAGES: Item[] = [
    { key: "javascript", label: "JavaScript", Icon: JavaScriptIcon },
    { key: "react", label: "React", Icon: ReactIcon },
    { key: "nextjs", label: "Next.js", Icon: NextjsIcon },
    { key: "typescript", label: "TypeScript", Icon: TypeScriptIcon},
    { key: "html", label: "HTML", Icon: HtmlIcon},
    { key: "css", label: "CSS", Icon: CssIcon}

];

export default function FrontendCard() {
    return (
        <div className={classes.languages_card}>
            <div>
                <h2>Frontend</h2>
            </div>
            <Container className={classes.languages_card}>
                <div className={classes.language_row}>
                        {FRONTEND_LANGUAGES.map(({ key, label, Icon }) => (
                            <Container key={key}>
                                <Icon width={75} height={75} />
                                {label && <p>{label}</p>}
                            </Container>
                        ))}
                </div>

            </Container>
        </div>
    );
}