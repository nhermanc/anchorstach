/**
 * Standalone contact API: verify Google reCAPTCHA v2/v3 for the static marketing site.
 * The browser submits to Web3Forms directly — Web3Forms blocks server→API calls from many
 * datacenter IPs (Cloudflare). See https://docs.web3forms.com/getting-started/api-reference
 *
 * @format
 */

import http from "node:http";

const PORT = parseInt(process.env.PORT || "3000", 10);
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY?.trim();

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
	if (!RECAPTCHA_SECRET || !token?.trim()) {
		return { ok: false, reason: "missing-secret-or-token" };
	}
	const params = new URLSearchParams();
	params.append("secret", RECAPTCHA_SECRET);
	params.append("response", token.trim());
	const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: params.toString(),
	});
	const data = await res.json().catch(() => ({}));
	if (data.success === true) return { ok: true, reason: "" };
	const codes = data["error-codes"];
	const reason = Array.isArray(codes) ? codes.join(", ") : "unknown";
	return { ok: false, reason };
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

function isCorsPreflightPath(pathname) {
	return (
		pathname === "/api/submit-inquiry" || pathname === "/api/verify-recaptcha"
	);
}

const server = http.createServer(async (req, res) => {
	const url = new URL(req.url || "/", `http://${req.headers.host}`);

	if (req.method === "OPTIONS" && isCorsPreflightPath(url.pathname)) {
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

	if (req.method === "POST" && url.pathname === "/api/submit-inquiry") {
		sendJson(res, req, 410, {
			success: false,
			message:
				"POST /api/submit-inquiry is retired. The site should POST { recaptchaToken } to /api/verify-recaptcha, then submit the form from the browser to https://api.web3forms.com/submit. Rebuild the static bundle.",
		});
		return;
	}

	if (req.method !== "POST" || url.pathname !== "/api/verify-recaptcha") {
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

	if (!recaptchaToken) {
		sendJson(res, req, 400, {
			success: false,
			message: "Please complete the reCAPTCHA verification.",
		});
		return;
	}

	const captcha = await verifyRecaptcha(recaptchaToken);
	if (!captcha.ok) {
		sendJson(res, req, 400, {
			success: false,
			message:
				`reCAPTCHA verification failed (${captcha.reason}). ` +
				`On Render, set RECAPTCHA_SECRET_KEY to the secret for the same key pair as the site key in your static build.`,
		});
		return;
	}

	sendJson(res, req, 200, {
		success: true,
		message: "reCAPTCHA verified.",
	});
});

server.listen(PORT, () => {
	const site =
		process.env.SITE_URL?.trim() ||
		process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
		"https://anchorstacktech.com";
	console.log(
		`[contact-submit] listening on :${PORT} site=${site} POST /api/verify-recaptcha CORS=family+defaults (override with CONTACT_ALLOWED_ORIGINS)`,
	);
});
