/** @format */

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * CORS for browser POSTs to contact-related APIs when CONTACT_ALLOWED_ORIGINS is set.
 */
export function applyContactApiCors(
	req: NextApiRequest,
	res: NextApiResponse,
): boolean {
	const raw = process.env.CONTACT_ALLOWED_ORIGINS?.trim();
	if (!raw) return false;

	const allowed = raw
		.split(",")
		.map((o) => o.trim())
		.filter(Boolean);
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
