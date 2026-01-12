import classes from './home.module.css';

import BackendCard from "../tech_cards/backend/BackendCard.tsx";
import {type StackFilter, StackToggle} from "../stack_toggle/StackToggle.tsx";
import * as React from "react";
import {ToolsContainer} from "../tech_cards/tools/ToolsContainer.tsx";
import DataCard from "../tech_cards/data/DataCard.tsx";
import FrontendCard from "../tech_cards/frontend/FrontendCard.tsx";


export default function HomeLayout() {
    const [filter, setFilter] = React.useState<StackFilter>("backend");
    return (
        <div>
            <div className={classes.toggleWrapper}>
                <StackToggle value={filter} onChange={setFilter}/>
            </div>
            <section className={classes.tech_stack}>

                {filter === "backend" && <BackendCard/>}
                {filter === "frontend" && <FrontendCard/>}
                {filter === "data" && <DataCard/>}

                <ToolsContainer filter={filter} />
            </section>
        </div>
    );
}