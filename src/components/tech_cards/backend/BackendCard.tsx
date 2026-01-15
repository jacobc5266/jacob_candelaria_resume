import {JavaIcon} from "./JavaIcon.tsx";
import {PythonIcon} from "./PythonIcon.tsx";
import {IconGridSection} from "../icon_grid/IconGridSection.tsx";
import type {IconItem} from "../IconItem.ts";

const BACKEND_LANGUAGES: IconItem[] = [
    { key: "java", isPrimary: true, startYear: 2021, Icon: JavaIcon },
    { key: "python", startYear: 2022, Icon: PythonIcon }

];

export default function BackendCard() {

    return (
        <IconGridSection
            title="Backend"
            note={
                <p>
                    Backend engineering is my primary focus, where I concentrate on building reliable systems,
                    data models, APIs, and infrastructure.
                </p>
            }
            items={BACKEND_LANGUAGES}
        />

    );
}