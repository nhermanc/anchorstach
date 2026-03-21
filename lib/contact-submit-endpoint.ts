/** @format */

import { companyInfo } from "../app/company-data";

/**
 * Browser POST target for reCAPTCHA + Web3Forms (`/api/submit-inquiry`).
 *
 * - **Production:** `NEXT_PUBLIC_CONTACT_SUBMIT_API_URL` (default baked in **`next.config.js`** for Render).
 * - **Local `next dev`:** same-origin `/api/submit-inquiry` (checked before env so localhost never hits Render).
 * - **Fallback:** `contact-api.<apex>` only if env were empty (should not happen with Next env defaults).
 */
export function getContactSubmitInquiryUrl(): string {
	if (typeof window !== "undefined") {
		const h = window.location.hostname;
		if (h === "localhost" || h === "127.0.0.1") {
			return "/api/submit-inquiry";
		}
	}

	const explicit = process.env.NEXT_PUBLIC_CONTACT_SUBMIT_API_URL?.trim();
	if (explicit) {
		return explicit.replace(/\/$/, "");
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
