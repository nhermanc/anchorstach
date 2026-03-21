/** @format */

import { companyInfo } from "../app/company-data";

/**
 * Browser POST target for reCAPTCHA + Web3Forms (`/api/submit-inquiry`).
 *
 * - **`NEXT_PUBLIC_CONTACT_SUBMIT_API_URL`:** full URL (use for **Render** `*.onrender.com` — see
 *   **`servers/contact-submit/README.md`**).
 * - **Otherwise:** `https://contact-api.<apex>/api/submit-inquiry` from `NEXT_PUBLIC_SITE_URL` if you
 *   host an API at that hostname; otherwise set the explicit URL above. See **`docs/RECAPTCHA_CONTACT_API.md`**.
 * - **Local dev:** same-origin `/api/submit-inquiry`.
 */
export function getContactSubmitInquiryUrl(): string {
	const explicit = process.env.NEXT_PUBLIC_CONTACT_SUBMIT_API_URL?.trim();
	if (explicit) {
		return explicit.replace(/\/$/, "");
	}

	if (typeof window !== "undefined") {
		const h = window.location.hostname;
		if (h === "localhost" || h === "127.0.0.1") {
			return "/api/submit-inquiry";
		}
	}

	try {
		const siteUrl =
			process.env.NEXT_PUBLIC_SITE_URL?.trim() || companyInfo.siteUrl;
		const u = new URL(siteUrl);
		const host = u.hostname.replace(/^www\./i, "");
		if (host === "localhost" || host === "127.0.0.1") {
			return "/api/submit-inquiry";
		}
		const protocol = u.protocol === "http:" ? "http:" : "https:";
		return `${protocol}//contact-api.${host}/api/submit-inquiry`;
	} catch {
		return "/api/submit-inquiry";
	}
}
