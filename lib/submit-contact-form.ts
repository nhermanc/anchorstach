/** @format */

import { companyInfo } from "../app/company-data";
import type { ContactApiPayload } from "./contact-payload";

/**
 * Web3Forms delivers to the inbox configured at web3forms.com — no FormSubmit “activate form” step.
 * Baked in so static export / CI (e.g. IONOS) works without build-time secrets. Override with
 * `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`; restrict allowed domains in the Web3Forms dashboard.
 */
const DEFAULT_WEB3FORMS_ACCESS_KEY = "c12c2493-5c4f-4314-b892-e77d3d6baeeb";

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
 * **SMTP (static IONOS + `contact-smtp-api`):** set **`NEXT_PUBLIC_CONTACT_API_BASE_URL`**
 * in the **static** build (no trailing slash). That always wins over FormSubmit flags.
 *
 * **Web3Forms (static, no activation email):** a default access key is used when you are not on the Node
 * API path; override with **`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`** from [web3forms.com](https://web3forms.com)
 * to rotate the key.
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
			await submitViaNextApi(input, signal);
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
