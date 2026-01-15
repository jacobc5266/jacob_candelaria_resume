import {PythonIcon} from "../backend/PythonIcon.tsx";
import {IconGridSection} from "../icon_grid/IconGridSection.tsx";
import type {IconItem} from "../IconItem.ts";

const DATA_LANGUAGES: IconItem[] = [
    { key: "python", isPrimary: true, startYear: 2022, Icon: PythonIcon }

];

export default function DataCard() {

    return (

        <IconGridSection
            title="Data"
            note={
                <p>
                    Alongside backend engineering, I actively enjoy data work — including data modeling, pipeline
                    design, analytics, and hands-on exploration.
                </p>
            }
            items={DATA_LANGUAGES}
        />
    );
}