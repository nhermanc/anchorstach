/** @format */

import { companyInfo } from "../app/company-data";

const DEFAULT_CONTACT =
	"https://anchorstacktech-contact-api.onrender.com/api/submit-inquiry";

/**
 * Browser POST target for the site assistant (`/api/site-chat` on the same host as the contact API).
 * - **Local `next dev`:** same-origin **`/api/site-chat`** (Next API route).
 * - **Production static:** full URL from env (see **`next.config.js`**).
 */
export function getSiteChatApiUrl(): string {
	if (typeof window !== "undefined") {
		const h = window.location.hostname;
		if (h === "localhost" || h === "127.0.0.1") {
			return "/api/site-chat";
		}
	}

	const explicit = process.env.NEXT_PUBLIC_SITE_CHAT_API_URL?.trim();
	if (explicit) {
		return explicit.replace(/\/$/, "");
	}

	const contact =
		process.env.NEXT_PUBLIC_CONTACT_SUBMIT_API_URL?.trim() || DEFAULT_CONTACT;
	try {
		const u = new URL(contact);
		u.pathname = "/api/site-chat";
		return u.toString();
	} catch {
		try {
			const siteUrl =
				process.env.NEXT_PUBLIC_SITE_URL?.trim() || companyInfo.siteUrl;
			const u = new URL(siteUrl);
			const host = u.hostname.replace(/^www\./i, "");
			const protocol = u.protocol === "http:" ? "http:" : "https:";
			return `${protocol}//contact-api.${host}/api/site-chat`;
		} catch {
			return "/api/site-chat";
		}
	}
}

export function isSiteChatEnabled(): boolean {
	return process.env.NEXT_PUBLIC_SITE_CHAT_ENABLED !== "0";
}
