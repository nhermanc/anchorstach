/** @format */

import { companyInfo } from "../app/company-data";

/**
 * Legacy URL segment used in **`NEXT_PUBLIC_CONTACT_SUBMIT_API_URL`** (full URL ending in this path).
 * The browser no longer POSTs the full form here from production; see **`getContactVerifyRecaptchaUrl()`**.
 */
export const CONTACT_SUBMIT_API_PATH = "/api/submit-inquiry";

/**
 * Resolves the **base** contact API URL (same host as submit-inquiry), used to derive **`/api/verify-recaptcha`**.
 */
export function getContactSubmitInquiryUrl(): string {
	if (typeof window !== "undefined") {
		const h = window.location.hostname;
		if (h === "localhost" || h === "127.0.0.1") {
			return CONTACT_SUBMIT_API_PATH;
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
			return CONTACT_SUBMIT_API_PATH;
		}
		const protocol = u.protocol === "http:" ? "http:" : "https:";
		return `${protocol}//contact-api.${host}${CONTACT_SUBMIT_API_PATH}`;
	} catch {
		return CONTACT_SUBMIT_API_PATH;
	}
}

/**
 * Browser POST target for **reCAPTCHA verification only** before submitting to Web3Forms **from the browser**.
 *
 * [Web3Forms](https://docs.web3forms.com/getting-started/api-reference) recommends client-side API use; server-side
 * calls from datacenter IPs (e.g. Render) are often blocked by Cloudflare (“Just a moment…” HTML, HTTP 403).
 */
export function getContactVerifyRecaptchaUrl(): string {
	const inquiry = getContactSubmitInquiryUrl();
	if (inquiry === CONTACT_SUBMIT_API_PATH) {
		return "/api/verify-recaptcha";
	}
	try {
		const u = new URL(inquiry);
		u.pathname = "/api/verify-recaptcha";
		return u.toString();
	} catch {
		return "/api/verify-recaptcha";
	}
}
