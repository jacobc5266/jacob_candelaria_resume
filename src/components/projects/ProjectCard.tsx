import classes from "@/components/projects/projects.module.css";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import {ProjectSchema} from "@/lib/blobSchemas";
import {z} from "zod";
import {useEffect, useRef} from "react";

export type Project = z.infer<typeof ProjectSchema>;


export type ProjectCardProps = {
    project: Project;
    isOpen: boolean;
    onToggle: () => void;
};

function getNormalizedDate(date: string | null): string | null {
    if (date === null) return null;
    const [year, month] = date.split("-");
    let normalizedMonth : string;
    switch (parseInt(month)) {
        case 1:
            normalizedMonth = "Jan"
            break;
        case 2:
            normalizedMonth = "Feb"
            break;
        case 3:
            normalizedMonth = "Mar"
            break;
        case 4:
            normalizedMonth = "Apr"
            break;
        case 5:
            normalizedMonth = "May"
            break;
        case 6:
            normalizedMonth = "Jun"
            break;
        case 7:
            normalizedMonth = "Jul"
            break;
        case 8:
            normalizedMonth = "Aug"
            break;
        case 9:
            normalizedMonth = "Sep"
            break;
        case 10:
            normalizedMonth = "Oct"
            break;
        case 11:
            normalizedMonth = "Nov"
            break;
        case 12:
            normalizedMonth = "Dec"
            break;
        default:
            normalizedMonth = ""
            break;
    }

    return `${normalizedMonth} ${year}`;
}

export default function ProjectCard({project, isOpen, onToggle}: ProjectCardProps) {
    const cardRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen && cardRef.current) {
            cardRef.current.scrollIntoView({
                behavior: "auto",
                block: "start",
            });
        }
    }, [isOpen]);

    return (
        <article className={classes.projectArticle} ref={cardRef}>
            <div className={isOpen ? classes.expandedProjectCard : classes.collapsedProjectCard}>
                <header className={classes.projectHeader} onClick={onToggle}>
                    <h2>{project.title.trim()}</h2>
                    <h4>{`${getNormalizedDate(project.startDate)} – ${getNormalizedDate(project.endDate) ?? 'Present'}`}</h4>
                    {project.company && <h5>{project.company}</h5>}
                    <hr/>
                </header>

                {!isOpen && (
                    <div className={classes.projectSummary}>
                        <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                            {project.summary.trim()}
                        </ReactMarkdown>
                    </div>
                )}

                {isOpen && (
                    <div className={classes.projectBody}>
                        <div>
                            <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                {project.extendedDescription.trim()}
                            </ReactMarkdown>
                        </div>
                        <hr className={classes.projectBodyHR} />
                        <div className={classes.linkSection}>
                            <h3>Links</h3>
                            <div className={classes.linkContainer}>
                                {project.links?.map(({id, name, url}) => (
                                    <a key={id} href={url} target="_blank" rel="noopener noreferrer" className={classes.pillLink}>
                                        {name}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <hr className={classes.projectBodyHR} />

                        <div className={classes.techStackSection}>
                            <h3>Technologies Used</h3>
                            <div className={classes.stackContainer}>
                                {project.languagesTools?.map((tech) => (
                                    <span key={tech} className={classes.pill}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}