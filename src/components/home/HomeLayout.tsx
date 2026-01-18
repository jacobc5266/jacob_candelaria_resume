'use client';

import classes from './home.module.css';

import {StackFilter, StackToggle} from "@/components/stack_toggle/StackToggle";
import BackendCard from "@/components/tech_cards/backend/BackendCard";
import FrontendCard from "@/components/tech_cards/frontend/FrontendCard";
import DataCard from "@/components/tech_cards/data/DataCard";
import DatastoresCard from "@/components/tech_cards/databases/DatastoresCard";
import {ToolsCard} from "@/components/tech_cards/tools/ToolsCard";
import {useRef, useState} from "react";



export default function HomeLayout() {
    const [filter, setFilter] = useState<StackFilter>("backend");
    const topAnchorRef = useRef<HTMLDivElement| null>(null);

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
                <StackToggle value={filter} onChangeAction={onFilterChange}/>
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