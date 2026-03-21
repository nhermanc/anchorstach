/** @format */

import { companyInfo } from "../app/company-data";
import { getContactSubmitInquiryUrl } from "./contact-submit-endpoint";
import type { ContactApiPayload } from "./contact-payload";
import { getContactRecaptchaSiteKey } from "./contact-recaptcha";
import { DEFAULT_WEB3FORMS_ACCESS_KEY } from "./web3forms-access-key";

export type SubmitContactInput = {
	name: string;
	email: string;
	/** Message body (contact “subject” field; hire-us combined text). */
	subject: string;
	/** Email subject line for the notification. */
	emailSubject: string;
	/** Google reCAPTCHA response when the site key is configured at build time. */
	recaptchaToken?: string;
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

/**
 * [Web3Forms](https://web3forms.com) — no “activate form” step for visitors; owner creates a free access key once.
 */
async function submitViaWeb3Forms(
	input: SubmitContactInput,
	accessKey: string,
	signal?: AbortSignal,
): Promise<void> {
	const res = await fetch("https://api.web3forms.com/submit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			access_key: accessKey,
			name: input.name,
			email: input.email,
			subject: input.emailSubject,
			message: input.subject,
		}),
		signal,
	});

	const data = (await res.json().catch(() => ({}))) as {
		success?: boolean;
		message?: string;
	};

	if (!res.ok || data.success !== true) {
		throw new Error(
			data?.message ||
				"Could not send your message. Please try again or email us directly.",
		);
	}
}

async function submitViaInquiryApi(
	input: SubmitContactInput,
	signal?: AbortSignal,
): Promise<void> {
	const token = input.recaptchaToken?.trim();
	if (!token) {
		throw new Error("Please complete the reCAPTCHA verification.");
	}

	const payload = {
		name: input.name,
		email: input.email,
		message: input.subject,
		emailSubject: input.emailSubject,
		recaptchaToken: token,
	};

	const response = await fetch(getContactSubmitInquiryUrl(), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(payload),
		signal,
	});

	const text = await response.text();
	let data: { success?: boolean; message?: string };
	try {
		data = JSON.parse(text) as typeof data;
	} catch {
		throw new Error(
			"The server returned an unexpected response. If this keeps happening, email us directly.",
		);
	}

	if (!response.ok || !data.success) {
		throw new Error(
			data.message ||
				"Could not send your message. Please try again or email us directly.",
		);
	}
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
		const raw = String(data?.message || "");
		if (/activation|activate form|activate your form/i.test(raw)) {
			throw new Error(
				`Please email us at ${companyInfo.email} for now. (FormSubmit: open the activation email sent to that inbox and click the link — or add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY for static sites; see .env.example.)`,
			);
		}
		throw new Error(
			raw ||
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
	const tok = input.recaptchaToken?.trim();
	if (tok) {
		payload.recaptchaToken = tok;
	}

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
 * **reCAPTCHA:** site key defaults in **`next.config.js`**; **`RECAPTCHA_SECRET_KEY`** lives only on
 * the API host (e.g. **`servers/contact-submit`** on **Render**). Static sites POST to
 * **`getContactSubmitInquiryUrl()`** — by default
 * **`https://contact-api.<your-domain>/api/submit-inquiry`** (see **`docs/RECAPTCHA_CONTACT_API.md`**)
 * or override with **`NEXT_PUBLIC_CONTACT_SUBMIT_API_URL`**.
 *
 * **SMTP (static IONOS + `contact-smtp-api`):** set **`NEXT_PUBLIC_CONTACT_API_BASE_URL`**
 * in the **static** build (no trailing slash). That always wins over FormSubmit flags.
 *
 * **Web3Forms (no reCAPTCHA):** default access key when not on the Node API path; override with
 * **`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`** or **`WEB3FORMS_ACCESS_KEY`** on the server.
 *
 * **FormSubmit:** requires a one-time “Activate form” click in **hello@anchorstacktech.com** (or use
 * **`NEXT_PUBLIC_FORMSUBMIT_FORM_ID`** after activation). Otherwise visitors see an activation error.
 *
 * **Local SMTP:** `next dev` + `SMTP_*` + **`NEXT_PUBLIC_USE_NODE_CONTACT_API=1`**.
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
	const recaptchaSiteKey = getContactRecaptchaSiteKey();
	const web3FromEnv = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
	const web3Key =
		web3FromEnv ||
		(!apiBase && !useNodeApi ? DEFAULT_WEB3FORMS_ACCESS_KEY : "");

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
		/* External SMTP API always first (so STATIC_ONLY cannot block it). */
		if (apiBase) {
			if (recaptchaSiteKey && !input.recaptchaToken?.trim()) {
				throw new Error("Please complete the reCAPTCHA verification.");
			}
			await submitViaNextApi(input, signal);
			return;
		}
		/* Local / Node: same-origin /api/contact can verify reCAPTCHA + SMTP */
		if (recaptchaSiteKey && useNodeApi) {
			if (!input.recaptchaToken?.trim()) {
				throw new Error("Please complete the reCAPTCHA verification.");
			}
			await submitViaNextApi(input, signal);
			return;
		}
		/* Static + Web3Forms: reCAPTCHA verified in /api/submit-inquiry before Web3Forms */
		if (recaptchaSiteKey) {
			if (!input.recaptchaToken?.trim()) {
				throw new Error("Please complete the reCAPTCHA verification.");
			}
			await submitViaInquiryApi(input, signal);
			return;
		}
		/* Static-friendly: Web3Forms needs no visitor-facing FormSubmit activation. */
		if (web3Key) {
			await submitViaWeb3Forms(input, web3Key, signal);
			return;
		}
		if (staticOnly) {
			await submitViaFormSubmit(input, signal);
			return;
		}
		if (useNodeApi) {
			await submitViaNextApi(input, signal);
			return;
		}

		await submitViaFormSubmit(input, signal);
	} finally {
		if (timeoutId !== undefined) {
			globalThis.clearTimeout(timeoutId);
		}
	}
}
