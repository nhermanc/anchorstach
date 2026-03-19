import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

import { companyInfo } from "../../app/company-data";

type ContactPayload = {
	name?: string;
	email?: string;
	subject?: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed." });
	}

	const { name, email, subject }: ContactPayload = req.body;
	if (!name || !email || !email.includes("@") || !subject) {
		return res.status(400).json({ message: "Invalid request payload." });
	}

	const smtpHost = process.env.SMTP_HOST;
	const smtpPort = Number(process.env.SMTP_PORT || 587);
	const smtpUser = process.env.SMTP_USER;
	const smtpPass = process.env.SMTP_PASS;
	const fromEmail = process.env.SMTP_FROM || smtpUser || companyInfo.email;
	try {
		if (smtpHost && smtpUser && smtpPass) {
			const transporter = nodemailer.createTransport({
				host: smtpHost,
				port: smtpPort,
				secure: smtpPort === 465,
				auth: {
					user: smtpUser,
					pass: smtpPass,
				},
			});

			await transporter.sendMail({
				from: fromEmail,
				to: companyInfo.email,
				replyTo: email,
				subject: `New contact form message from ${name}`,
				text: `Name: ${name}\nEmail: ${email}\nMessage: ${subject}`,
				html: `
					<h2>New Contact Request</h2>
					<p><strong>Name:</strong> ${name}</p>
					<p><strong>Email:</strong> ${email}</p>
					<p><strong>Message:</strong></p>
					<p>${subject.replace(/\n/g, "<br/>")}</p>
				`,
			});

			return res.status(200).json({
				message: "Message sent successfully.",
				provider: "smtp",
			});
		}
		const formSubmitToken = process.env.FORMSUBMIT_TOKEN;
		const formSubmitEndpoint = formSubmitToken
			? `https://formsubmit.co/ajax/${encodeURIComponent(formSubmitToken)}`
			: `https://formsubmit.co/ajax/${encodeURIComponent(companyInfo.email)}`;

		return res.status(200).json({
			message: "Using client-side FormSubmit fallback.",
			provider: "formsubmit-client",
			formSubmitEndpoint,
		});
	} catch (error: any) {
		return res.status(500).json({
			message: "Unable to process contact request. Please try again later.",
		});
	}
}
