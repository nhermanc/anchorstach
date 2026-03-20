/** @format */

import { companyInfo } from "../app/company-data";

export type SubmitContactInput = {
	name: string;
	email: string;
	/** Stored as FormSubmit `message` and in SMTP body */
	subject: string;
	/** Email subject line (FormSubmit `_subject`) */
	emailSubject: string;
};

function getFormSubmitAjaxUrl(endpointFromApi?: string): string {
	if (endpointFromApi) return endpointFromApi;
	const token = process.env.NEXT_PUBLIC_FORMSUBMIT_TOKEN?.trim();
	if (token) {
		return `https://formsubmit.co/ajax/${encodeURIComponent(token)}`;
	}
	return `https://formsubmit.co/ajax/${encodeURIComponent(companyInfo.email)}`;
}

async function postToFormSubmit(
	endpoint: string,
	input: SubmitContactInput,
	signal?: AbortSignal,
): Promise<void> {
	const providerResponse = await fetch(endpoint, {
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

	const providerData = await providerResponse.json().catch(() => ({}));
	if (
		!providerResponse.ok ||
		String(providerData?.success || "").toLowerCase() !== "true"
	) {
		throw new Error(
			providerData?.message ||
				"Provider did not confirm delivery. Please try again.",
		);
	}
}

/**
 * Contact + Hire Us forms.
 *
 * - **Static hosting (IONOS):** `/api/contact` is missing → JSON parse fails or 404 → posts to FormSubmit.
 * - **Optional:** set `NEXT_PUBLIC_CONTACT_FORM_CLIENT=1` to skip `/api/contact` entirely (smaller request).
 * - **FormSubmit token:** `NEXT_PUBLIC_FORMSUBMIT_TOKEN` (or public email from `companyInfo.email`).
 */
export async function submitContactMessage(
	input: SubmitContactInput,
	options?: { signal?: AbortSignal },
): Promise<void> {
	const clientOnly =
		process.env.NEXT_PUBLIC_CONTACT_FORM_CLIENT === "true" ||
		process.env.NEXT_PUBLIC_CONTACT_FORM_CLIENT === "1";

	let timeoutId: ReturnType<typeof setTimeout> | undefined;
	let internalController: AbortController | undefined;

	const signal =
		options?.signal ??
		(() => {
			internalController = new AbortController();
			timeoutId = globalThis.setTimeout(() => internalController!.abort(), 12000);
			return internalController.signal;
		})();

	try {
		if (clientOnly) {
			await postToFormSubmit(getFormSubmitAjaxUrl(), input, signal);
			return;
		}

		const response = await fetch("/api/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: input.name,
				email: input.email,
				subject: input.subject,
			}),
			signal,
		});

		const text = await response.text();
		let responseData: {
			message?: string;
			provider?: string;
			formSubmitEndpoint?: string;
		};
		try {
			responseData = JSON.parse(text) as typeof responseData;
		} catch {
			/* Static export: server returns HTML 404 for /api/contact */
			await postToFormSubmit(getFormSubmitAjaxUrl(), input, signal);
			return;
		}

		if (!response.ok) {
			if (response.status === 404 || response.status === 405) {
				await postToFormSubmit(getFormSubmitAjaxUrl(), input, signal);
				return;
			}
			throw new Error(responseData?.message || "Message sending failed.");
		}

		if (responseData?.provider === "smtp") {
			return;
		}

		if (
			responseData?.provider === "formsubmit-client" &&
			responseData?.formSubmitEndpoint
		) {
			await postToFormSubmit(
				responseData.formSubmitEndpoint,
				input,
				signal,
			);
			return;
		}

		await postToFormSubmit(getFormSubmitAjaxUrl(), input, signal);
	} finally {
		if (timeoutId !== undefined) {
			globalThis.clearTimeout(timeoutId);
		}
	}
}
