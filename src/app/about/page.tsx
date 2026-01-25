import AboutMeLayout from "@/components/about/AboutMeLayout";
import { AboutDocSchema } from "@/lib/blobSchemas";

export default async function About() {
    const url = process.env.BLOB_READ_ABOUT_URL;
    if (!url) {
        throw new Error("Missing BLOB_READ_ABOUT_URL");
    }

    const raw = await fetch(url, { cache: "force-cache" }).then((res) => res.json());
    const data = AboutDocSchema.parse(raw);

    return (
        <AboutMeLayout aboutMe={data.AboutMe} />
    );
}
