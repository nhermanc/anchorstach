/** @format */

/**
 * Human-readable message when Web3Forms does not return success.
 */
export function messageFromWeb3FormsResponse(
	httpStatus: number,
	rawText: string,
	parsed: unknown,
): string {
	const raw = rawText.trim();
	if (
		httpStatus === 403 &&
		(raw.includes("Just a moment") ||
			raw.includes("cf-browser-verification") ||
			raw.includes("challenge-platform"))
	) {
		return (
			"Web3Forms responded with a Cloudflare challenge (HTTP 403), which usually happens when the request is sent from a server/datacenter IP. " +
			"This site sends the form from your browser after reCAPTCHA is verified on our API. If you still see this, try another network or email hello@anchorstacktech.com."
		);
	}
	if (parsed && typeof parsed === "object") {
		const o = parsed as Record<string, unknown>;
		const m = o.message;
		if (typeof m === "string" && m.trim()) return m.trim();
		const e = o.error;
		if (typeof e === "string" && e.trim()) return e.trim();
	}
	const slice = raw.slice(0, 240);
	if (slice) {
		return `Web3Forms returned HTTP ${httpStatus}: ${slice}`;
	}
	return (
		`Web3Forms error (HTTP ${httpStatus}). ` +
		`Confirm your access key at web3forms.com and allow domain anchorstacktech.com (and www). ` +
		`Or email hello@anchorstacktech.com.`
	);
}
