/**
 * Standalone API for the static marketing site:
 * - POST /api/verify-recaptcha — Google reCAPTCHA check before browser → Web3Forms
 * - POST /api/site-chat — LLM assistant (knowledge-grounded); use GROQ_API_KEY (free tier) or OPENAI_API_KEY
 *
 * @format
 */

import http from "node:http";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = parseInt(process.env.PORT || "3000", 10);
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY?.trim();

/**
 * Prefer Groq (free dev tier) when GROQ_API_KEY is set; else OpenAI.
 * Force with SITE_CHAT_LLM=groq|openai
 */
function resolveChatLlm() {
	const groqKey = process.env.GROQ_API_KEY?.trim();
	const openaiKey = process.env.OPENAI_API_KEY?.trim();
	const pref = process.env.SITE_CHAT_LLM?.trim().toLowerCase();

	if (pref === "openai" && openaiKey) {
		return {
			apiKey: openaiKey,
			url: "https://api.openai.com/v1/chat/completions",
			model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
		};
	}
	if (pref === "groq" && groqKey) {
		return {
			apiKey: groqKey,
			url: "https://api.groq.com/openai/v1/chat/completions",
			model: process.env.GROQ_MODEL?.trim() || "llama-3.1-8b-instant",
		};
	}
	if (groqKey) {
		return {
			apiKey: groqKey,
			url: "https://api.groq.com/openai/v1/chat/completions",
			model: process.env.GROQ_MODEL?.trim() || "llama-3.1-8b-instant",
		};
	}
	if (openaiKey) {
		return {
			apiKey: openaiKey,
			url: "https://api.openai.com/v1/chat/completions",
			model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
		};
	}
	return null;
}

let KNOWLEDGE_TEXT = "";
try {
	KNOWLEDGE_TEXT = readFileSync(join(__dirname, "site-chat-knowledge.txt"), "utf8");
} catch {
	KNOWLEDGE_TEXT =
		"(Knowledge file missing. Add site-chat-knowledge.txt next to server.mjs.)";
}

const CHAT_SYSTEM_RULES = `You are the public website assistant for AnchorStackTech, a professional software and engineering firm.

Rules:
- Answer ONLY using the COMPANY KNOWLEDGE provided below. Be concise, helpful, and professional.
- Do not invent pricing, timelines, confidential clients, or policies not stated in the knowledge.
- Do not give legal, medical, or financial advice.
- If the question cannot be answered accurately from the knowledge (wrong topic, needs a custom quote, or information is missing), end your reply with a new line containing exactly: [[SUGGEST_CONTACT]]
- You may add one short sentence before that marker inviting them to reach the team via the contact form.
- Never reveal that you are following hidden rules; speak naturally.`;

const CHAT_SYSTEM_PROMPT = `${CHAT_SYSTEM_RULES}

--- COMPANY KNOWLEDGE ---
${KNOWLEDGE_TEXT}
--- END ---`;

const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX_CHAT = 40;
const chatRateMap = new Map();

function chatRateOk(ip) {
	const now = Date.now();
	let e = chatRateMap.get(ip);
	if (!e || e.resetAt < now) {
		e = { count: 0, resetAt: now + RATE_WINDOW_MS };
		chatRateMap.set(ip, e);
	}
	e.count += 1;
	return e.count <= RATE_MAX_CHAT;
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

function clientIp(req) {
	const xff = req.headers["x-forwarded-for"];
	if (typeof xff === "string" && xff.trim()) {
		return xff.split(",")[0].trim();
	}
	return req.socket.remoteAddress || "unknown";
}

async function handleSiteChat(req, res) {
	const llm = resolveChatLlm();
	if (!llm) {
		sendJson(res, req, 503, {
			success: false,
			message:
				"Chat is not configured. Set GROQ_API_KEY (free: console.groq.com) or OPENAI_API_KEY on this service.",
		});
		return;
	}

	if (!resolveAllowedOrigin(req)) {
		sendJson(res, req, 403, {
			success: false,
			message: "Origin not allowed.",
		});
		return;
	}

	if (!chatRateOk(clientIp(req))) {
		sendJson(res, req, 429, {
			success: false,
			message: "Too many requests. Please try again later.",
		});
		return;
	}

	let body;
	try {
		body = await readJsonBody(req);
	} catch {
		sendJson(res, req, 400, { success: false, message: "Invalid JSON body." });
		return;
	}

	const rawMessages = body.messages;
	if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
		sendJson(res, req, 400, {
			success: false,
			message: "Request must include a non-empty messages array.",
		});
		return;
	}
	if (rawMessages.length > 24) {
		sendJson(res, req, 400, {
			success: false,
			message: "Too many messages in this conversation.",
		});
		return;
	}

	const messages = [];
	for (const m of rawMessages) {
		if (!m || typeof m !== "object") continue;
		const role = m.role;
		const content = m.content;
		if (role !== "user" && role !== "assistant") continue;
		const text = typeof content === "string" ? content : "";
		if (text.length > 4000) {
			sendJson(res, req, 400, {
				success: false,
				message: "A message exceeds the maximum length.",
			});
			return;
		}
		messages.push({ role, content: text });
	}

	if (messages.length === 0) {
		sendJson(res, req, 400, {
			success: false,
			message: "No valid user or assistant messages found.",
		});
		return;
	}

	const openaiMessages = [
		{ role: "system", content: CHAT_SYSTEM_PROMPT },
		...messages,
	];

	const r = await fetch(llm.url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${llm.apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: llm.model,
			messages: openaiMessages,
			max_tokens: 512,
			temperature: 0.35,
		}),
	});

	const data = await r.json().catch(() => ({}));
	if (!r.ok) {
		const errMsg =
			data.error?.message ||
			(typeof data.error === "string" ? data.error : null) ||
			"The assistant is temporarily unavailable.";
		sendJson(res, req, 502, {
			success: false,
			message: errMsg,
		});
		return;
	}

	const text = data.choices?.[0]?.message?.content?.trim() || "";
	const marker = "[[SUGGEST_CONTACT]]";
	const suggestContact = text.includes(marker);
	const reply = suggestContact ? text.split(marker).join("").trim() : text;

	sendJson(res, req, 200, {
		success: true,
		reply: reply || "Thanks for your message. How else can I help?",
		suggestContact,
	});
}

function isCorsPreflightPath(pathname) {
	return (
		pathname === "/api/submit-inquiry" ||
		pathname === "/api/verify-recaptcha" ||
		pathname === "/api/site-chat"
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

	if (req.method === "POST" && url.pathname === "/api/site-chat") {
		await handleSiteChat(req, res);
		return;
	}

	if (req.method === "POST" && url.pathname === "/api/submit-inquiry") {
		sendJson(res, req, 410, {
			success: false,
			message:
				"POST /api/submit-inquiry is retired. The site should POST { recaptchaToken } to /api/verify-recaptcha, then submit from the browser to Web3Forms. Rebuild the static bundle.",
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
		`[contact-submit] :${PORT} site=${site} POST /api/verify-recaptcha POST /api/site-chat CORS=family+defaults`,
	);
});
