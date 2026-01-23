import { NextResponse } from "next/server";
import { validateTurnstileToken } from "next-turnstile";
import { randomUUID } from "crypto";
import { ContactRequestBody } from "@/types/contact";
import { sendEmailToYou } from "@/server/email/EmailToYou";
import { sendConfirmationEmail } from "@/server/email/ConfirmationEmail";

export const runtime = "nodejs";

export async function POST(req: Request) {
    let body: ContactRequestBody;

    try {
        body = (await req.json()) as ContactRequestBody;
    } catch {
        return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
    }

    const { payload, token } = body;

    // Honeypot: if filled, silently accept
    if (payload?.address?.trim()) {
        return NextResponse.json({ ok: true });
    }

    if (!token || typeof token !== "string") {
        return NextResponse.json({ message: "Missing security token." }, { status: 400 });
    }

    const turnstileSecret = process.env.CF_TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
        return NextResponse.json({ message: "Server misconfigured." }, { status: 500 });
    }

    const validation = await validateTurnstileToken({
        token,
        secretKey: turnstileSecret,
        idempotencyKey: randomUUID(),
        sandbox: process.env.NODE_ENV === "development",
    });

    if (!validation.success) {
        return NextResponse.json({ message: "Security check failed." }, { status: 400 });
    }

    if (!payload?.name || !payload?.email || !payload?.subject || !payload?.message) {
        return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    const allowedSenderIdentities = new Set([
        "RECRUITER",
        "HIRING_MANAGER",
        "TEAM_MEMBER",
        "NETWORKING",
        "GENERAL_INQUIRY",
    ]);
    if (!allowedSenderIdentities.has(payload.senderIdentity)) {
        return NextResponse.json({ message: "Invalid sender identity." }, { status: 400 });
    }

    const normalized = {
        ...payload,
        name: payload.name.trim(),
        email: payload.email.trim(),
        subject: payload.subject.trim(),
        message: payload.message.trim(),
        phone: payload.phone?.trim() || undefined,
        company: payload.company?.trim() || undefined,
        address: undefined, // don't propagate honeypot anywhere
    };

    if (!normalized.name || !normalized.email || !normalized.subject || !normalized.message) {
        return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
        return NextResponse.json({ message: "Invalid email." }, { status: 400 });
    }

    let primaryMessageId: string | undefined;
    try {
        const primaryData = await sendEmailToYou(normalized);
        primaryMessageId = primaryData?.id;
    } catch (e) {
        console.error("Primary email send failure:", e);
        return NextResponse.json({ message: "Failed to send email." }, { status: 500 });
    }

    let confirmationMessageId: string | undefined;
    try {
        const confirmationData = await sendConfirmationEmail(normalized);
        confirmationMessageId = confirmationData?.id;
    } catch (e) {
        console.error("Confirmation email send failure:", e);
        return NextResponse.json({
            ok: true,
            warning: "Confirmation email failed.",
            messageId: primaryMessageId,
        });
    }

    return NextResponse.json({
        ok: true,
        messageId: primaryMessageId,
        confirmationId: confirmationMessageId,
    });
}
