'use client';
import classes from './contact-layout.module.css';
import Container from "@/components/container/Container";
import { Turnstile } from "next-turnstile";
import {FormEvent, useRef, useState} from "react";
import {ContactFormPayload, ContactRequestBody} from "@/types/contact";

type TurnstileStatus = "success" | "error" | "expired" | "required";

export default function ContactLayout() {
    const autoGrow = (e: FormEvent<HTMLTextAreaElement>) => {
        const el = e.currentTarget;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    };

    const formRef = useRef<HTMLFormElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const [turnstileStatus, setTurnstileStatus] = useState<TurnstileStatus>("required");
    const [turnstileToken, setTurnstileToken] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<{ type: "success" | "warning"; text: string } | null>(null);
    const [isSending, setIsSending] = useState(false);


    function getInquiryTypeDropdown() {
        return (
            <div className={classes.contact_element}>
                <label htmlFor="senderIdentity">
                    My role in this inquiry is... <span className={classes.required} aria-hidden="true">*</span>
                </label>

                <select id="senderIdentity" className={classes.inquiry_type_dropdown} name="senderIdentity" required defaultValue="">
                    <option value="" disabled>Select one...</option>
                    <option value="RECRUITER">Recruiter</option>
                    <option value="HIRING_MANAGER">Hiring Manager</option>
                    <option value="TEAM_MEMBER">Team Member</option>
                    <option value="NETWORKING">Networking</option>
                    <option value="GENERAL_INQUIRY">General Inquiry</option>
                </select>
                <small className={classes.dropdown_footnote}>
                    This helps me prioritize hiring-related messages.
                </small>
            </div>
        );
    }


    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setStatusMessage(null);

        if (!formRef.current) return;
        if (isSending) return;

        if (turnstileStatus !== "success" || !turnstileToken) {
            setError("Please verify you are not a robot.");
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);

        // build a typed payload (strings only)
        const body: ContactRequestBody = {
            token: turnstileToken,
            payload: {
                name: String(formData.get("name") ?? "").trim(),
                email: String(formData.get("email") ?? "").trim(),
                phone: String(formData.get("phone") ?? "").trim() || undefined,
                company: String(formData.get("company") ?? "").trim() || undefined,
                senderIdentity: String(formData.get("senderIdentity") ?? "") as ContactFormPayload["senderIdentity"],
                subject: String(formData.get("subject") ?? "").trim(),
                message: String(formData.get("message") ?? "").trim(),
                preferredContactTime: String(formData.get("preferredContactTime") ?? "").trim() || undefined,
            },
        };

        setIsSending(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                setError(data?.message ?? "Failed to send. Please try again.");
                return;
            }

            // reset form + require re-verify (simple approach)
            formRef.current.reset();
            if (messageRef.current) {
                messageRef.current.style.height = "";
            }
            setTurnstileStatus("required");
            setTurnstileToken("");
            setStatusMessage({
                type: data?.warning ? "warning" : "success",
                text: data?.warning
                    ? "Message sent, but the confirmation email failed."
                    : "Message sent successfully. Thank you!",
            });
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className={classes.contact_section}>
            <h2>Contact Me</h2>
            <p>Feel free to fill out the form below to send me an email.</p>

            <Container>
                <form className={classes.contact_form} onSubmit={onSubmit} ref={formRef} aria-busy={isSending}>
                    <div className={classes.contact_row}>
                        <div className={classes.contact_element}>
                            <label htmlFor="name">Name <span className={classes.required} aria-hidden="true">*</span></label>
                            <input type="text" name="name" id="name" required placeholder="Enter your name here..." autoComplete="name" />
                        </div>
                        <div className={classes.contact_element}>
                            <label htmlFor="email">Email <span className={classes.required} aria-hidden="true">*</span></label>
                            <input type="email" name="email" id="email" required placeholder="Enter your email here..." autoComplete="email" />
                        </div>
                    </div>
                    <div className={classes.contact_row}>
                        <div className={classes.contact_element}>
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" name="phone" id="phone" placeholder="Enter your phone number here..." autoComplete="tel" />
                        </div>
                        <div className={classes.contact_element}>
                            <label htmlFor="company">Company</label>
                            <input type="text" name="company" id="company" placeholder="Enter your company name here..." autoComplete="organization" />
                        </div>
                    </div>
                    <div className={`${classes.contact_element} ${classes.hp}`} aria-hidden="true">
                        <label htmlFor="preferredContactTime">Preferred Contact Time</label>
                        <input
                            type="text"
                            name="preferredContactTime"
                            id="preferredContactTime"
                            tabIndex={-1}
                            autoComplete="off"
                            placeholder="Enter your preferred contact time..."
                        />
                    </div>
                    {getInquiryTypeDropdown()}
                    <div className={classes.contact_element}>
                        <label htmlFor="subject">Subject <span className={classes.required} aria-hidden="true">*</span></label>
                        <input type="text" name="subject" id="subject" required placeholder="Enter the email subject here..." />
                    </div>
                    <div className={classes.contact_element}>
                        <label htmlFor="message">Message <span className={classes.required} aria-hidden="true">*</span></label>
                        <textarea
                            ref={messageRef}
                            onInput={autoGrow}
                            name="message"
                            id="message"
                            required
                            placeholder="Enter your message here..."
                        />
                    </div>
                    <div className={classes.turnstile_wrapper}>
                        <Turnstile
                            siteKey={process.env.NEXT_PUBLIC_CF_SITE_KEY!}
                            retry="auto"
                            refreshExpired="auto"
                            sandbox={process.env.NODE_ENV === "development"}
                            onLoad={() => {
                                setTurnstileStatus("required");
                                setError(null);
                            }}
                            onVerify={(token) => {
                                setTurnstileStatus("success");
                                setTurnstileToken(token);
                                setError(null);
                            }}
                            onExpire={() => {
                                setTurnstileStatus("expired");
                                setTurnstileToken("");
                                setError("Security check expired. Please verify again.");
                            }}
                            onError={() => {
                                setTurnstileStatus("error");
                                setTurnstileToken("");
                                setError("Security check failed. Please try again.");
                            }}
                        />
                    </div>

                    {error && <p role="alert" className={`${classes.status_message} ${classes.status_error}`}>{error}</p>}
                    {statusMessage && (
                        <p
                            role="status"
                            className={`${classes.status_message} ${
                                statusMessage.type === "success" ? classes.status_success : classes.status_warning
                            }`}
                        >
                            {statusMessage.text}
                        </p>
                    )}
                    <div className={classes.form_buttons}>
                        <button className={classes.send_button} type="submit" disabled={isSending}>
                            {isSending ? "Sending..." : "Send"}
                        </button>
                    </div>
                    <div className={classes.required_footnote}>
                        <span className={classes.required} aria-hidden="true">*</span> Required fields
                    </div>
                </form>
            </Container>
        </section>
    );
}
