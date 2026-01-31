import { ProjectsDocSchema } from "@/lib/blobSchemas";
import ProjectsLayout from "@/components/projects/ProjectsLayout";

export default async function ProjectsPage() {
    const url = process.env.BLOB_READ_PROJECTS_URL;
    if (!url) {
        throw new Error("Missing BLOB_READ_PROJECTS_URL");
    }

    const raw = await fetch(url, {
        cache: "force-cache",
        next: { tags: ["projects-blob"] },
    }).then((res) => res.json());

    const data = ProjectsDocSchema.parse(raw);
    void data;

    return (
        <ProjectsLayout data={data}/>
    );
}
