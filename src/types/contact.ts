export type InquiryType =
    | "RECRUITER"
    | "HIRING_MANAGER"
    | "TEAM_MEMBER"
    | "NETWORKING"
    | "GENERAL_INQUIRY";

export interface ContactFormPayload {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone?: string;
    company?: string;
    senderIdentity: InquiryType;
    preferredContactTime?: string; // honeypot
}

export type ContactRequestBody = {
    payload: ContactFormPayload;
    token: unknown;
};
