import classes from "./experience.module.css";
import Container from "@/components/container/Container";
import type { ExperienceDoc } from "@/lib/blobSchemas";

type ExperienceItem = ExperienceDoc["experience"][number]["positions"][number] & {
    company: string;
};

type ExperienceGroup = {
    company: string;
    roles: ExperienceItem[];
};

function toSortKey(value: string | null): number {
    // Newest first; treat null as "Present" (push to top)
    if (!value) return Number.POSITIVE_INFINITY;
    const [year, month] = value.split("-").map(Number);
    return year * 12 + (month - 1);
}

function formatYearMonth(value: string | null): string {
    if (!value) return "Present";
    const [year, month] = value.split("-").map(Number);
    const date = new Date(year, month - 1, 1);
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

type ExperienceLayoutProps = {
    data: ExperienceDoc;
};

export default function ExperienceLayout({ data }: ExperienceLayoutProps) {
    const items: ExperienceItem[] = data.experience
        .flatMap((c) => c.positions.map((p) => ({ ...p, company: c.company })))
        .sort((a, b) => toSortKey(b.startDate) - toSortKey(a.startDate));

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
                                    {formatYearMonth(role.startDate)} – {formatYearMonth(role.endDate)}
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
