/** @format */

import type { NextApiRequest, NextApiResponse } from "next";

import { applySubmitInquiryCors } from "../../lib/submit-inquiry-cors";

type ErrorJson = { success: false; message: string };

/**
 * Retired: the contact flow verifies reCAPTCHA via **`/api/verify-recaptcha`**, then POSTs to Web3Forms
 * from the **browser** (Web3Forms blocks many server-to-server requests from datacenter IPs).
 */
export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ErrorJson>,
) {
	if (applySubmitInquiryCors(req, res)) return;

	if (req.method !== "POST") {
		return res.status(405).json({
			success: false,
			message: "Method not allowed.",
		});
	}

	return res.status(410).json({
		success: false,
		message:
			"POST /api/submit-inquiry is retired. Use POST /api/verify-recaptcha with { \"recaptchaToken\": \"...\" }, then submit to Web3Forms from the browser. Rebuild the static site from the latest main.",
	});
}
