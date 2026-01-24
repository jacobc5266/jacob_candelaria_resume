import type {IconItem} from "../IconItem.ts";
import {JavaIcon} from "@/components/tech_cards/backend/JavaIcon";
import {PythonIcon} from "@/components/tech_cards/backend/PythonIcon";
import {IconGridSection} from "@/components/tech_cards/icon_grid/IconGridSection";

const BACKEND_LANGUAGES: IconItem[] = [
    { key: "java", label: "Java", isPrimary: true, startYear: 2021, Icon: JavaIcon },
    { key: "python", label: "Python", startYear: 2022, Icon: PythonIcon }

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