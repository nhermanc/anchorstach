/** @format */

import type { NextApiRequest, NextApiResponse } from "next";

import { companyInfo } from "../app/company-data";

function allowedOriginsForSubmitInquiry(): string[] {
	const raw = process.env.CONTACT_ALLOWED_ORIGINS?.trim();
	if (raw) {
		return Array.from(
			new Set(
				raw
					.split(",")
					.map((o) => o.trim())
					.filter(Boolean),
			),
		);
	}

	const out: string[] = [];
	const site =
		process.env.NEXT_PUBLIC_SITE_URL?.trim() || companyInfo.siteUrl;
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

	if (process.env.NODE_ENV !== "production") {
		out.push("http://localhost:3000", "http://127.0.0.1:3000");
	}

	return Array.from(new Set(out));
}

/**
 * CORS for `POST /api/submit-inquiry` from the static marketing site (different subdomain).
 */
export function applySubmitInquiryCors(
	req: NextApiRequest,
	res: NextApiResponse,
): boolean {
	const allowed = allowedOriginsForSubmitInquiry();
	const origin = req.headers.origin;

	if (origin && allowed.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
		res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type");
		res.setHeader("Vary", "Origin");
	}

	if (req.method === "OPTIONS") {
		res.status(204).end();
		return true;
	}

	return false;
}
