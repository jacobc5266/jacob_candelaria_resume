import type { ContactFormPayload } from "@/types/contact";
import { Resend } from "resend";

export async function sendEmailToYou(payload: ContactFormPayload) {
    const apiKey = process.env.RESEND_API_KEY;
    const myEmail = process.env.MY_EMAIL;

    if (!apiKey || !myEmail) {
        throw new Error("Missing RESEND_API_KEY or MY_EMAIL environment variables");
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
        from: "Dev Portfolio Inquiry <inquiry@mail.jcandelaria.dev>",
        to: [myEmail],
        subject: `[${payload.senderIdentity}] ${payload.subject}`,
        replyTo: payload.email,
        react: <EmailToYouTemplate payload={payload} />,
    });

    if (error) {
        throw new Error(`Resend error: ${error.message}`);
    }

    return data;
}

function EmailToYouTemplate({ payload }: { payload: ContactFormPayload }) {
    return (
        <div>
            <div><strong>Name:</strong> {payload.name.trim()}</div>
            <div><strong>Email:</strong> {payload.email.trim()}</div>
            <div><strong>Company:</strong> {payload.company?.trim() ?? ""}</div>
            <div><strong>Phone:</strong> {payload.phone?.trim() ?? ""}</div>
            <hr />
            <div><strong>Message:</strong></div>
            <div style={{ whiteSpace: "pre-wrap" }}>{payload.message.trim()}</div>
        </div>
    );
}
