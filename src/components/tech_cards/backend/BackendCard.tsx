import classes from '../TechCard.module.css';
import Container from "../../container/Container.tsx";
import {JavaIcon} from "./JavaIcon.tsx";
import {PythonIcon} from "./PythonIcon.tsx";
import * as React from "react";

type Item = {
    key: string;
    label?: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const BACKEND_LANGUAGES: Item[] = [
    { key: "java", Icon: JavaIcon },
    { key: "python", Icon: PythonIcon }

];

export default function BackendCard() {

    return (
        <div className={classes.languages_card}>
            <div className={classes.stackNote}>
                <p>
                    Backend engineering is my primary focus, where I concentrate on building reliable systems,
                    data models, APIs, and infrastructure.
                </p>
            </div>

            <div>
                <h2>Backend</h2>
            </div>
            <Container className={classes.languages_card}>
                <div className={classes.language_row}>
                    {BACKEND_LANGUAGES.map(({ key, label, Icon }) => (
                        <Container key={key}>
                            <Icon width={75} height={75} />
                            {label && <p>{label}</p>}
                            {key === "java" && <p className={classes.subheader}>Primary Language</p>}
                        </Container>
                    ))}
                </div>
            </Container>
        </div>

    );
}