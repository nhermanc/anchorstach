/** @format */

import type { NextApiRequest, NextApiResponse } from "next";

import { applySubmitInquiryCors } from "../../lib/submit-inquiry-cors";
import { validateContactBody } from "../../lib/contact-api-validation";
import { verifyRecaptchaResponse } from "../../lib/recaptcha-verify";
import { resolveWeb3FormsAccessKey } from "../../lib/web3forms-access-key";

type SuccessJson = { success: true; message: string };
type ErrorJson = { success: false; message: string; errors?: string[] };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SuccessJson | ErrorJson>,
) {
	if (applySubmitInquiryCors(req, res)) return;

	if (req.method !== "POST") {
		return res.status(405).json({
			success: false,
			message: "Method not allowed.",
		});
	}

	let body: unknown = req.body;
	if (typeof body === "string") {
		try {
			body = JSON.parse(body) as unknown;
		} catch {
			return res.status(400).json({
				success: false,
				message: "Invalid JSON body.",
			});
		}
	}

	const o = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
	const recaptchaToken =
		typeof o.recaptchaToken === "string" ? o.recaptchaToken.trim() : "";

	const validated = validateContactBody(body);
	if (!validated.ok) {
		return res.status(400).json({
			success: false,
			message: validated.errors[0] || "Validation failed.",
			errors: validated.errors,
		});
	}

	const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
	if (!secret) {
		return res.status(503).json({
			success: false,
			message:
				"Contact form is not fully configured. Please try again later.",
		});
	}

	if (!recaptchaToken) {
		return res.status(400).json({
			success: false,
			message: "Please complete the reCAPTCHA verification.",
		});
	}

	const captchaOk = await verifyRecaptchaResponse(recaptchaToken);
	if (!captchaOk) {
		return res.status(400).json({
			success: false,
			message: "reCAPTCHA verification failed. Please try again.",
		});
	}

	const { name, email, message, emailSubject } = validated.data;
	const accessKey = resolveWeb3FormsAccessKey();

	const w3Res = await fetch("https://api.web3forms.com/submit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			access_key: accessKey,
			name,
			email,
			subject:
				emailSubject && emailSubject.length > 0
					? emailSubject
					: `New message from ${name}`,
			message,
		}),
	});

	const w3Data = (await w3Res.json().catch(() => ({}))) as {
		success?: boolean;
		message?: string;
	};

	if (!w3Res.ok || w3Data.success !== true) {
		return res.status(502).json({
			success: false,
			message:
				w3Data.message ||
				"Could not send your message. Please try again or email us directly.",
		});
	}

	return res.status(200).json({
		success: true,
		message: "Message sent successfully.",
	});
}
