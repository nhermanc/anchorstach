/**
 * Standalone contact submit API: verify Google reCAPTCHA v2/v3, forward to Web3Forms.
 * No Next.js — deploy on Railway, Render, Fly.io, Docker, or any VPS with Node 18+.
 *
 * @format
 */

import http from "node:http";

const PORT = parseInt(process.env.PORT || "3000", 10);
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY?.trim();
const WEB3_KEY =
	process.env.WEB3FORMS_ACCESS_KEY?.trim() ||
	"c12c2493-5c4f-4314-b892-e77d3d6baeeb";

const EMAIL_RE =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MIN_MESSAGE = 6;
const MAX_MESSAGE = 7000;
const MAX_SUBJECT_LINE = 200;

function trimStr(v, max) {
	if (typeof v !== "string") return "";
	const t = v.trim();
	return t.length > max ? t.slice(0, max) : t;
}

function validateBody(body) {
	const errors = [];
	const o = body && typeof body === "object" ? body : {};

	const name = trimStr(o.name, MAX_NAME);
	const emailRaw = trimStr(o.email, MAX_EMAIL);
	const message =
		trimStr(o.message, MAX_MESSAGE) || trimStr(o.subject, MAX_MESSAGE);
	const emailSubjectRaw = o.emailSubject;
	const emailSubject =
		typeof emailSubjectRaw === "string"
			? emailSubjectRaw.trim().slice(0, MAX_SUBJECT_LINE)
			: undefined;

	if (!name) errors.push("Name is required.");
	if (!emailRaw) errors.push("Email is required.");
	else if (!EMAIL_RE.test(emailRaw)) errors.push("Email is invalid.");
	if (!message) errors.push("Message is required.");
	else if (message.length < MIN_MESSAGE)
		errors.push(`Message must be at least ${MIN_MESSAGE} characters.`);
	else if (message.length > MAX_MESSAGE) errors.push("Message is too long.");

	if (errors.length) return { ok: false, errors };

	return {
		ok: true,
		data: { name, email: emailRaw, message, emailSubject },
	};
}

function defaultOriginsFromSite(site) {
	const out = [];
	try {
		const u = new URL(site);
		const host = u.hostname.replace(/^www\./i, "");
		const p = u.protocol === "http:" ? "http:" : "https:";
		const apex = `${p}//${host}`;
		const www = `${p}//www.${host}`;
		out.push(apex);
		if (apex !== www) out.push(www);
	} catch {
		// ignore
	}
	return Array.from(new Set(out));
}

function originMatchesSiteFamily(origin, siteUrl) {
	try {
		const o = new URL(origin);
		const s = new URL(siteUrl);
		const strip = (h) => h.replace(/^www\./i, "").toLowerCase();
		const siteApex = strip(s.hostname);
		const oh = o.hostname.toLowerCase();
		if (strip(oh) === siteApex) return true;
		if (oh.endsWith("." + siteApex)) return true;
		return false;
	} catch {
		return false;
	}
}

function resolveAllowedOrigin(req) {
	const origin = req.headers.origin;
	if (!origin) return null;
	const explicit = process.env.CONTACT_ALLOWED_ORIGINS?.trim();
	if (explicit) {
		const list = explicit
			.split(",")
			.map((o) => o.trim())
			.filter(Boolean);
		return list.includes(origin) ? origin : null;
	}
	const site =
		process.env.SITE_URL?.trim() ||
		process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
		"https://anchorstacktech.com";
	const defaults = defaultOriginsFromSite(site);
	if (defaults.includes(origin)) return origin;
	if (originMatchesSiteFamily(origin, site)) return origin;
	return null;
}

function corsHeaders(req) {
	const origin = resolveAllowedOrigin(req);
	const h = {};
	if (origin) {
		h["Access-Control-Allow-Origin"] = origin;
		h["Access-Control-Allow-Methods"] = "POST, OPTIONS";
		h["Access-Control-Allow-Headers"] = "Content-Type";
		h["Vary"] = "Origin";
	}
	return h;
}

async function verifyRecaptcha(token) {
	if (!RECAPTCHA_SECRET || !token?.trim()) return false;
	const params = new URLSearchParams();
	params.append("secret", RECAPTCHA_SECRET);
	params.append("response", token.trim());
	const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: params.toString(),
	});
	const data = await res.json().catch(() => ({}));
	return data.success === true;
}

async function submitWeb3Forms({ name, email, message, emailSubject }) {
	const res = await fetch("https://api.web3forms.com/submit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			access_key: WEB3_KEY,
			name,
			email,
			subject:
				emailSubject && emailSubject.length > 0
					? emailSubject
					: `New message from ${name}`,
			message,
		}),
	});
	const data = await res.json().catch(() => ({}));
	return { ok: res.ok && data.success === true, message: data.message };
}

function readJsonBody(req) {
	return new Promise((resolve, reject) => {
		const chunks = [];
		req.on("data", (c) => chunks.push(c));
		req.on("end", () => {
			try {
				const raw = Buffer.concat(chunks).toString("utf8");
				if (!raw) return resolve({});
				resolve(JSON.parse(raw));
			} catch (e) {
				reject(e);
			}
		});
		req.on("error", reject);
	});
}

function sendJson(res, req, status, obj) {
	const body = JSON.stringify(obj);
	const h = {
		"Content-Type": "application/json; charset=utf-8",
		"Content-Length": Buffer.byteLength(body),
		...corsHeaders(req),
	};
	res.writeHead(status, h);
	res.end(body);
}

const server = http.createServer(async (req, res) => {
	const url = new URL(req.url || "/", `http://${req.headers.host}`);

	if (req.method === "OPTIONS" && url.pathname === "/api/submit-inquiry") {
		const h = corsHeaders(req);
		res.writeHead(204, h);
		res.end();
		return;
	}

	if (req.method === "GET" && url.pathname === "/health") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("ok");
		return;
	}

	if (req.method !== "POST" || url.pathname !== "/api/submit-inquiry") {
		sendJson(res, req, 404, { success: false, message: "Not found." });
		return;
	}

	if (!RECAPTCHA_SECRET) {
		sendJson(res, req, 503, {
			success: false,
			message: "Server misconfiguration: RECAPTCHA_SECRET_KEY is not set.",
		});
		return;
	}

	let body;
	try {
		body = await readJsonBody(req);
	} catch {
		sendJson(res, req, 400, {
			success: false,
			message: "Invalid JSON body.",
		});
		return;
	}

	const recaptchaToken =
		typeof body.recaptchaToken === "string"
			? body.recaptchaToken.trim()
			: "";

	const validated = validateBody(body);
	if (!validated.ok) {
		sendJson(res, req, 400, {
			success: false,
			message: validated.errors[0] || "Validation failed.",
			errors: validated.errors,
		});
		return;
	}

	if (!recaptchaToken) {
		sendJson(res, req, 400, {
			success: false,
			message: "Please complete the reCAPTCHA verification.",
		});
		return;
	}

	const captchaOk = await verifyRecaptcha(recaptchaToken);
	if (!captchaOk) {
		sendJson(res, req, 400, {
			success: false,
			message: "reCAPTCHA verification failed. Please try again.",
		});
		return;
	}

	const { name, email, message, emailSubject } = validated.data;
	const w3 = await submitWeb3Forms({
		name,
		email,
		message,
		emailSubject,
	});

	if (!w3.ok) {
		sendJson(res, req, 502, {
			success: false,
			message:
				w3.message ||
				"Could not send your message. Please try again or email us directly.",
		});
		return;
	}

	sendJson(res, req, 200, {
		success: true,
		message: "Message sent successfully.",
	});
});

server.listen(PORT, () => {
	const site =
		process.env.SITE_URL?.trim() ||
		process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
		"https://anchorstacktech.com";
	console.log(
		`[contact-submit] listening on :${PORT} site=${site} CORS=family+defaults (override with CONTACT_ALLOWED_ORIGINS)`,
	);
});
