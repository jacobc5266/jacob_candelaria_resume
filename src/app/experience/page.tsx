import ExperienceLayout from "@/components/experience/ExperienceLayout";
import { ExperienceDocSchema } from "@/lib/blobSchemas";

export default async function ExperiencePage() {
    const url = process.env.BLOB_READ_EXPERIENCE_URL;
    if (!url) {
        throw new Error("Missing BLOB_READ_EXPERIENCE_URL");
    }

    const raw = await fetch(url, { cache: "force-cache" }).then((res) => res.json());
    const data = ExperienceDocSchema.parse(raw);

    return (
        <ExperienceLayout data={data} />
    );
}
