/** @format */

/**
 * Server-side verification for Google reCAPTCHA v2 / v3 (`g-recaptcha-response` token).
 */
export async function verifyRecaptchaResponse(token: string): Promise<boolean> {
	const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
	if (!secret) {
		return false;
	}
	const t = token?.trim();
	if (!t) {
		return false;
	}
	const params = new URLSearchParams();
	params.append("secret", secret);
	params.append("response", t);
	const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: params.toString(),
	});
	const data = (await res.json().catch(() => ({}))) as { success?: boolean };
	return data.success === true;
}
