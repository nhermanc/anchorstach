/** @format */

import { companyInfo } from "../app/company-data";
import type { ContactApiPayload } from "./contact-payload";

export type SubmitContactInput = {
	name: string;
	email: string;
	/** Message body (contact “subject” field; hire-us combined text). */
	subject: string;
	/** Email subject line for the notification. */
	emailSubject: string;
};

/**
 * FormSubmit endpoint (public — id or email is visible in bundled JS; use an activated form id in production).
 */
function getFormSubmitAjaxUrl(): string {
	const id = process.env.NEXT_PUBLIC_FORMSUBMIT_FORM_ID?.trim();
	if (id) {
		return `https://formsubmit.co/ajax/${encodeURIComponent(id)}`;
	}
	return `https://formsubmit.co/ajax/${encodeURIComponent(companyInfo.email)}`;
}

function getContactApiUrl(): string {
	const base = process.env.NEXT_PUBLIC_CONTACT_API_BASE_URL?.replace(/\/$/, "");
	if (base) {
		return `${base}/api/contact`;
	}
	return "/api/contact";
}

async function submitViaFormSubmit(
	input: SubmitContactInput,
	signal?: AbortSignal,
): Promise<void> {
	const res = await fetch(getFormSubmitAjaxUrl(), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			name: input.name,
			email: input.email,
			message: input.subject,
			_subject: input.emailSubject,
			_template: "table",
			_captcha: "false",
		}),
		signal,
	});

	const data = (await res.json().catch(() => ({}))) as {
		success?: string | boolean;
		message?: string;
	};

	if (
		!res.ok ||
		String(data?.success ?? "").toLowerCase() !== "true"
	) {
		throw new Error(
			data?.message ||
				"Could not send your message. Please try again or email us directly.",
		);
	}
}

async function submitViaNextApi(
	input: SubmitContactInput,
	signal?: AbortSignal,
): Promise<void> {
	const payload: ContactApiPayload = {
		name: input.name,
		email: input.email,
		message: input.subject,
		emailSubject: input.emailSubject,
	};

	const response = await fetch(getContactApiUrl(), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(payload),
		signal,
	});

	const text = await response.text();
	let data: { success?: boolean; message?: string; errors?: string[] };
	try {
		data = JSON.parse(text) as typeof data;
	} catch {
		throw new Error(
			"The server returned an unexpected response. Please try again.",
		);
	}

	if (!response.ok || !data.success) {
		throw new Error(
			data.message ||
				data.errors?.[0] ||
				"Unable to send your message. Please try again.",
		);
	}
}

function envFlagTrue(v: string | undefined): boolean {
	return v === "true" || v === "1";
}

/**
 * Contact + Hire Us.
 *
 * **IONOS static (`next export`):** there is no `/api/contact`. By default this posts to
 * **FormSubmit** from the browser (no SMTP on IONOS). Set **`NEXT_PUBLIC_CONTACT_STATIC_ONLY=1`**
 * in the IONOS build env to guarantee FormSubmit even if other vars are set by mistake.
 *
 * **Optional Node API:** `NEXT_PUBLIC_CONTACT_API_BASE_URL` or `NEXT_PUBLIC_USE_NODE_CONTACT_API=1`
 * (local SMTP via `next dev` / `next start` only — not for static `deploy/`).
 */
export async function submitContactMessage(
	input: SubmitContactInput,
	options?: { signal?: AbortSignal },
): Promise<void> {
	const staticOnly = envFlagTrue(
		process.env.NEXT_PUBLIC_CONTACT_STATIC_ONLY?.trim(),
	);
	const useNodeApi = envFlagTrue(
		process.env.NEXT_PUBLIC_USE_NODE_CONTACT_API?.trim(),
	);
	const apiBase = process.env.NEXT_PUBLIC_CONTACT_API_BASE_URL?.trim();

	let timeoutId: ReturnType<typeof setTimeout> | undefined;
	let internalController: AbortController | undefined;

	const signal =
		options?.signal ??
		(() => {
			internalController = new AbortController();
			timeoutId = globalThis.setTimeout(() => internalController!.abort(), 25000);
			return internalController.signal;
		})();

	try {
		if (staticOnly || (!useNodeApi && !apiBase)) {
			await submitViaFormSubmit(input, signal);
			return;
		}

		await submitViaNextApi(input, signal);
	} finally {
		if (timeoutId !== undefined) {
			globalThis.clearTimeout(timeoutId);
		}
	}
}
