import classes from './home.module.css';

import BackendCard from "../tech_cards/backend/BackendCard.tsx";
import {type StackFilter, StackToggle} from "../stack_toggle/StackToggle.tsx";
import * as React from "react";
import {ToolsCard} from "../tech_cards/tools/ToolsCard.tsx";
import DataCard from "../tech_cards/data/DataCard.tsx";
import FrontendCard from "../tech_cards/frontend/FrontendCard.tsx";
import DatastoresCard from "../tech_cards/databases/DatastoresCard.tsx";


export default function HomeLayout() {
    const [filter, setFilter] = React.useState<StackFilter>("backend");
    const topAnchorRef = React.useRef<HTMLDivElement| null>(null);

    const onFilterChange = (next: StackFilter) => {
        setFilter(next);

        // wait for the DOM to update, then jump
        requestAnimationFrame(() => {
            topAnchorRef.current?.scrollIntoView({ block: "start" });
        });
    };


    return (
        <div className={classes.homeLayout}>
            <div className={classes.toggleWrapper}>
                <StackToggle value={filter} onChange={onFilterChange}/>
            </div>

            <div ref={topAnchorRef} className={classes.sectionTopAnchor} />

            <section className={classes.tech_stack}>

                {filter === "backend" && <BackendCard/>}
                {filter === "frontend" && <FrontendCard/>}
                {filter === "data" && <DataCard/>}

                <DatastoresCard filter={filter} />
                <ToolsCard filter={filter} />
            </section>
        </div>
    );
}