import type {IconItem} from "../IconItem.ts";
import {PythonIcon} from "@/components/tech_cards/backend/PythonIcon";
import {IconGridSection} from "@/components/tech_cards/icon_grid/IconGridSection";

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