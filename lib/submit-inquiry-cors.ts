/** @format */

import type { NextApiRequest, NextApiResponse } from "next";

import { companyInfo } from "../app/company-data";
import { originMatchesSiteFamily } from "./cors-site-family";

function defaultOriginsFromSite(site: string): string[] {
	const out: string[] = [];
	try {
		const u = new URL(site);
		const host = u.hostname.replace(/^www\./i, "");
		const p = u.protocol === "http:" ? "http:" : "https:";
		const apex = `${p}//${host}`;
		const www = `${p}//www.${host}`;
		out.push(apex);
		if (apex !== www) {
			out.push(www);
		}
	} catch {
		// ignore
	}
	return Array.from(new Set(out));
}

/**
 * Resolves allowed `Access-Control-Allow-Origin` value, or null if disallowed.
 */
function resolveAllowedOrigin(req: NextApiRequest): string | null {
	const origin = req.headers.origin;
	if (!origin || typeof origin !== "string") {
		return null;
	}

	const explicit = process.env.CONTACT_ALLOWED_ORIGINS?.trim();
	if (explicit) {
		const list = Array.from(
			new Set(
				explicit
					.split(",")
					.map((o) => o.trim())
					.filter(Boolean),
			),
		);
		return list.includes(origin) ? origin : null;
	}

	const site =
		process.env.NEXT_PUBLIC_SITE_URL?.trim() || companyInfo.siteUrl;
	const defaults = defaultOriginsFromSite(site);
	if (defaults.includes(origin)) {
		return origin;
	}
	if (originMatchesSiteFamily(origin, site)) {
		return origin;
	}

	if (process.env.NODE_ENV !== "production") {
		if (
			origin === "http://localhost:3000" ||
			origin === "http://127.0.0.1:3000"
		) {
			return origin;
		}
	}

	return null;
}

function applyCorsHeaders(res: NextApiResponse, origin: string | null): void {
	if (origin) {
		res.setHeader("Access-Control-Allow-Origin", origin);
		res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type");
		res.setHeader("Vary", "Origin");
	}
}

/**
 * CORS for contact API routes (`/api/verify-recaptcha`, retired `/api/submit-inquiry`) from the static site.
 */
export function applySubmitInquiryCors(
	req: NextApiRequest,
	res: NextApiResponse,
): boolean {
	const allowedOrigin = resolveAllowedOrigin(req);
	applyCorsHeaders(res, allowedOrigin);

	if (req.method === "OPTIONS") {
		res.status(204).end();
		return true;
	}

	return false;
}
