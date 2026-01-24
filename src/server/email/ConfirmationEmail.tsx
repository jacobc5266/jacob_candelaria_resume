import {ContactFormPayload} from "@/types/contact";
import {Resend} from "resend";
import renderMessage from "@/server/email/RenderMessage";


export async function sendConfirmationEmail(payload: ContactFormPayload) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        throw new Error("Missing RESEND_API_KEY environment variables");
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
        from: "Jacob Candelaria <no-reply@mail.jcandelaria.dev>",
        to: payload.email,
        subject: `Message Received: ${payload.subject}`,
        react: <ConfirmationEmailTemplate payload={payload} />,
    });

    console.log("Resend sendConfirmationEmail response:", { data, error });

    if (error) {
        throw new Error(`Resend error: ${error.message}`);
    }

    return data;
}

function ConfirmationEmailTemplate({ payload }: { payload: ContactFormPayload }) {
    const company = payload.company?.trim() ?? "";
    const phone = payload.phone?.trim() ?? "";
    return (
        <div>
            <p>
                Thank you for contacting me! I will get back to you as soon as possible. Below is a copy of your form submission.
            </p>

            <div><strong>Name:</strong> {payload.name.trim()}</div>
            <div><strong>Email:</strong> {payload.email.trim()}</div>
            {company ? <div><strong>Company:</strong> {company}</div> : null}
            {phone ? <div><strong>Phone:</strong> {phone}</div> : null}

            <hr />

            <div><strong>Subject:</strong> {payload.subject}</div>
            <div><strong>Message:</strong></div>
            {renderMessage(payload.message)}

        </div>
    );
}
