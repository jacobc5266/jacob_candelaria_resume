'use client';
import classes from './projects.module.css';
import ProjectCard, {Project} from "@/components/projects/ProjectCard";
import {useState} from "react";
import {ProjectsDoc} from "@/lib/blobSchemas";

type ProjectLayoutProps = {
    data: ProjectsDoc;
}

function yearMonthToNumber(value: string | null): number {
    if (!value) return Number.NEGATIVE_INFINITY;

    const [year, month] = value.split("-").map(Number);
    return year * 100 + month;
}

function compareProjects(a: Project, b: Project): number {
    const startA = yearMonthToNumber(a.startDate);
    const startB = yearMonthToNumber(b.startDate);

    // Newer start dates first
    if (startA !== startB) {
        return startB - startA;
    }

    const endA = a.endDate;
    const endB = b.endDate;

    // Same start date → in-progress first
    if (endA === null && endB !== null) return -1;
    if (endA !== null && endB === null) return 1;

    // Both ended → newer end date first
    if (endA && endB) {
        return yearMonthToNumber(endB) - yearMonthToNumber(endA);
    }

    return 0;
}

export default function ProjectsLayout({data}: ProjectLayoutProps) {
    const sortedProjects = [...data.projects].sort(compareProjects);

    const [openProjectId, setOpenProjectId] = useState<string | null>(null);

    return (
        <section className={classes.projectSection}>
            {sortedProjects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    isOpen={openProjectId === project.id}
                    onToggle={() =>
                        setOpenProjectId((prev) =>
                            prev === project.id ? null : project.id
                        )
                    }
                />
            ))}
        </section>
    );
}
