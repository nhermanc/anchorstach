/** @format */

/**
 * Human-readable message when Web3Forms does not return success.
 */
export function messageFromWeb3FormsResponse(
	httpStatus: number,
	rawText: string,
	parsed: unknown,
): string {
	if (parsed && typeof parsed === "object") {
		const o = parsed as Record<string, unknown>;
		const m = o.message;
		if (typeof m === "string" && m.trim()) return m.trim();
		const e = o.error;
		if (typeof e === "string" && e.trim()) return e.trim();
	}
	const slice = rawText.trim().slice(0, 240);
	if (slice) {
		return `Web3Forms returned HTTP ${httpStatus}: ${slice}`;
	}
	return (
		`Web3Forms error (HTTP ${httpStatus}). ` +
		`Confirm your access key at web3forms.com and allow domain anchorstacktech.com (and www). ` +
		`Or email hello@anchorstacktech.com.`
	);
}
