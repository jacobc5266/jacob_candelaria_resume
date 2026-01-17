import experienceJson from "../../data/experience.json";
import Container from "../container/Container.tsx";
import classes from "./experience.module.css";

type YearMonth = { year: number | null; month: number | null };

type Position = {
    title: string | null;
    start: YearMonth;
    end: YearMonth;
    location: string | null;
    isRemote: boolean;
    description: string[];
};

type CompanyExperience = {
    company: string;
    positions: Position[];
};

type ExperienceFile = {
    Template?: unknown;
    experience: CompanyExperience[];
};

type ExperienceItem = Position & {
    company: string;
};

type ExperienceGroup = {
    company: string;
    roles: ExperienceItem[];
};

function toSortKey(d: YearMonth): number {
    // Newest first; treat null as "Present" (push to top)
    if (d.year == null || d.month == null) return Number.POSITIVE_INFINITY;
    return d.year * 12 + (d.month - 1);
}

function formatYearMonth(d: YearMonth): string {
    if (d.year == null || d.month == null) return "Present";
    const date = new Date(d.year, d.month - 1, 1);
    return date.toLocaleString(undefined, { month: "short", year: "numeric" });
}

function groupConsecutiveByCompany(sortedItems: ExperienceItem[]): ExperienceGroup[] {
    const groups: ExperienceGroup[] = [];

    for (const item of sortedItems) {
        const lastGroup = groups[groups.length - 1];

        if (lastGroup && lastGroup.company === item.company) {
            lastGroup.roles.push(item);
        } else {
            groups.push({ company: item.company, roles: [item] });
        }
    }

    return groups;
}

export default function ExperienceLayout() {
    const data = experienceJson as ExperienceFile;

    const items: ExperienceItem[] = data.experience
        .flatMap((c) => c.positions.map((p) => ({ ...p, company: c.company })))
        .sort((a, b) => toSortKey(b.start) - toSortKey(a.start));

    const groups = groupConsecutiveByCompany(items);

    return (
        <section className={classes.experienceSection}>
            <h2>Experience</h2>

            {groups.map((group, gIdx) => (
                <Container key={`${group.company}-${gIdx}`} header={<h3>{group.company}</h3>} dividerClassName={classes.companyDivider}>
                    {group.roles.map((role, rIdx) => (
                        <div className={classes.roleContainer} key={`${group.company}-${role.title ?? "role"}-${rIdx}`}>
                            <div className={classes.roleContent}>
                                <h4 className={classes.roleTitle}>{role.title ?? "Career Break"}</h4>

                                <div className={classes.roleMeta}>
                                    {formatYearMonth(role.start)} – {formatYearMonth(role.end)}
                                    <br />
                                    {role.location ? role.location : ""}
                                    {role.isRemote ? (role.location ? " • Remote" : "Remote") : ""}
                                </div>

                                <hr className={classes.roleDetailsHr} />

                                <ul className={classes.roleBullets}>
                                    {role.description.map((bullet, i) => (
                                        <li key={i}>{bullet.trim()}</li>
                                    ))}
                                </ul>

                                {rIdx < group.roles.length - 1 && <hr className={classes.roleHr} />}
                            </div>
                        </div>
                    ))}
                </Container>
            ))}
        </section>
    );
}
