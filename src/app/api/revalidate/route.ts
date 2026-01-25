import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    const { secret, paths } = await req.json();

    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    (paths ?? []).forEach((p: string) => revalidatePath(p));

    return NextResponse.json({ revalidated: true, paths });
}
