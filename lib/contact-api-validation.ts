/** @format */

import type { ContactApiPayload } from "./contact-payload";

const EMAIL_RE =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export type ValidationResult =
	| { ok: true; data: ContactApiPayload }
	| { ok: false; errors: string[] };

const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MIN_MESSAGE = 6;
const MAX_MESSAGE = 7000;
const MAX_SUBJECT_LINE = 200;

function trimStr(v: unknown, max: number): string {
	if (typeof v !== "string") return "";
	const t = v.trim();
	return t.length > max ? t.slice(0, max) : t;
}

/**
 * Validates JSON body for POST /api/contact.
 * Accepts legacy `subject` as message body for older clients.
 */
export function validateContactBody(body: unknown): ValidationResult {
	const errors: string[] = [];
	const o = body && typeof body === "object" ? (body as Record<string, unknown>) : {};

	const name = trimStr(o.name, MAX_NAME);
	const emailRaw = trimStr(o.email, MAX_EMAIL);
	const messageFromMessage = trimStr(o.message, MAX_MESSAGE);
	const messageFromSubject = trimStr(o.subject, MAX_MESSAGE);
	const message = messageFromMessage || messageFromSubject;

	const emailSubjectRaw = o.emailSubject;
	const emailSubject =
		typeof emailSubjectRaw === "string"
			? emailSubjectRaw.trim().slice(0, MAX_SUBJECT_LINE)
			: undefined;

	if (!name) errors.push("Name is required.");
	else if (name.length > MAX_NAME) errors.push("Name is too long.");

	if (!emailRaw) errors.push("Email is required.");
	else if (emailRaw.length > MAX_EMAIL) errors.push("Email is too long.");
	else if (!EMAIL_RE.test(emailRaw)) errors.push("Email is invalid.");

	if (!message) errors.push("Message is required.");
	else if (message.length < MIN_MESSAGE) {
		errors.push(`Message must be at least ${MIN_MESSAGE} characters.`);
	} else if (message.length > MAX_MESSAGE) {
		errors.push("Message is too long.");
	}

	if (errors.length > 0) {
		return { ok: false, errors };
	}

	return {
		ok: true,
		data: {
			name,
			email: emailRaw,
			message,
			...(emailSubject ? { emailSubject } : {}),
		},
	};
}

export function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}
