/** @format */

import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

import { companyInfo } from "../../app/company-data";
import {
	escapeHtml,
	validateContactBody,
} from "../../lib/contact-api-validation";

type SuccessJson = { success: true; message: string };
type ErrorJson = { success: false; message: string; errors?: string[] };

function applyCors(
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

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SuccessJson | ErrorJson>,
) {
	if (applyCors(req, res)) return;

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

	const validated = validateContactBody(body);
	if (!validated.ok) {
		return res.status(400).json({
			success: false,
			message: validated.errors[0] || "Validation failed.",
			errors: validated.errors,
		});
	}

	const { name, email, message, emailSubject } = validated.data;

	const smtpHost = process.env.SMTP_HOST?.trim();
	const smtpPort = Number(process.env.SMTP_PORT || 587);
	const smtpUser = process.env.SMTP_USER?.trim();
	const smtpPass = process.env.SMTP_PASS?.trim();
	const smtpSecure =
		process.env.SMTP_SECURE === "true" || smtpPort === 465;
	const toEmail =
		process.env.CONTACT_MAIL_TO?.trim() || companyInfo.email;
	const fromEmail =
		process.env.SMTP_FROM?.trim() || smtpUser || companyInfo.email;

	if (!smtpHost || !smtpUser || !smtpPass) {
		return res.status(503).json({
			success: false,
			message:
				"Contact form is not configured on the server. Please try again later.",
		});
	}

	const mailSubject =
		emailSubject && emailSubject.length > 0
			? emailSubject
			: `New contact message from ${name}`;

	const safeName = escapeHtml(name);
	const safeEmail = escapeHtml(email);
	const safeMessageHtml = escapeHtml(message).replace(/\r\n|\n|\r/g, "<br/>");

	try {
		const transporter = nodemailer.createTransport({
			host: smtpHost,
			port: smtpPort,
			secure: smtpSecure,
			auth: {
				user: smtpUser,
				pass: smtpPass,
			},
		});

		await transporter.sendMail({
			from: fromEmail,
			to: toEmail,
			replyTo: email,
			subject: mailSubject,
			text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
			html: `
				<h2>New contact request</h2>
				<p><strong>Name:</strong> ${safeName}</p>
				<p><strong>Email:</strong> ${safeEmail}</p>
				<p><strong>Message:</strong></p>
				<p>${safeMessageHtml}</p>
			`,
		});

		return res.status(200).json({
			success: true,
			message: "Message sent successfully.",
		});
	} catch (err: unknown) {
		console.error("[api/contact] sendMail error:", err);
		return res.status(500).json({
			success: false,
			message: "Unable to send your message. Please try again later.",
		});
	}
}
