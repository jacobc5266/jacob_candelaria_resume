import { z } from "zod";

const yearMonthRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
const yearMonthSchema = z.string().regex(yearMonthRegex, "Expected YYYY-MM");
const nullableYearMonthSchema = z.union([yearMonthSchema, z.null()]).default(null);

const urlSchema = z.string().refine((value) => /^(https:\/\/|mailto:)/.test(value), {
    message: "URL must start with https:// or mailto:",
});

const stringArraySchema = z.preprocess(
    (value) => (Array.isArray(value) ? value : []),
    z.array(z.string())
);

const linkArraySchema = z.preprocess(
    (value) => (Array.isArray(value) ? value : []),
    z.array(
        z.object({
            id: z.string().min(1),
            name: z.string().min(1),
            url: urlSchema,
        })
    )
);

export const ProjectSchema = z.object({
    id: z.string().min(1),
    title: z.string(),
    startDate: nullableYearMonthSchema,
    endDate: nullableYearMonthSchema,
    summary: z.string(),
    extendedDescription: z.string(),
    company: z.string(),
    links: linkArraySchema,
    languagesTools: stringArraySchema,
    tags: stringArraySchema,
});

export const ProjectsDocSchema = z.object({
    version: z.literal(1),
    ProjectTemplate: ProjectSchema,
    projects: z.preprocess((value) => (Array.isArray(value) ? value : []), z.array(ProjectSchema)),
});

export const PositionSchema = z.object({
    id: z.string().min(1),
    title: z.string().nullable(),
    startDate: nullableYearMonthSchema,
    endDate: nullableYearMonthSchema,
    location: z.string().nullable(),
    isRemote: z.boolean(),
    description: stringArraySchema,
});

export const CompanySchema = z.object({
    id: z.string().min(1),
    company: z.string(),
    positions: z.preprocess((value) => (Array.isArray(value) ? value : []), z.array(PositionSchema)),
});

export const ExperienceDocSchema = z.object({
    version: z.literal(1),
    Template: CompanySchema,
    experience: z.preprocess((value) => (Array.isArray(value) ? value : []), z.array(CompanySchema)),
});

export const AboutDocSchema = z.object({
    version: z.literal(1),
    AboutMe: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectsDoc = z.infer<typeof ProjectsDocSchema>;
export type Position = z.infer<typeof PositionSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type ExperienceDoc = z.infer<typeof ExperienceDocSchema>;
export type AboutDoc = z.infer<typeof AboutDocSchema>;
