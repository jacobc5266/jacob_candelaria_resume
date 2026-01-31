import classes from "@/components/projects/projects.module.css";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import Link from "next/dist/client/link";
import {ProjectSchema} from "@/lib/blobSchemas";
import {z} from "zod";

export type Project = z.infer<typeof ProjectSchema>;


export type ProjectCardProps = {
    project: Project;
    isOpen: boolean;
    onToggle: () => void;
};

export default function ProjectCard({project, isOpen, onToggle}: ProjectCardProps) {
    return (
        <article>
            <div className={isOpen ? classes.expandedProjectCard : classes.collapsedProjectCard}>
                <header className={classes.projectHeader} onClick={onToggle}>
                    <h2>{project.title.trim()}</h2>
                    <h4>{`${project.startDate} – ${project.endDate ?? 'Present'}`}</h4>
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
                        <hr/>
                        <div className={classes.linkSection}>
                            <h3>Links</h3>
                            <div className={classes.linkContainer}>
                                {project.links?.map(({id, name, url}) => (
                                    <Link key={id} href={url} className={classes.pillLink}>
                                        {name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <hr/>

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