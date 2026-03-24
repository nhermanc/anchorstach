/** @format */

/**
 * Whether a browser `Origin` belongs to the same site as `siteUrl` (apex match, www vs non-www,
 * or subdomains like `deploy.anchorstacktech.com`).
 */
export function originMatchesSiteFamily(
	origin: string,
	siteUrl: string,
): boolean {
	try {
		const o = new URL(origin);
		const s = new URL(siteUrl);
		const stripWww = (h: string) => h.replace(/^www\./i, "").toLowerCase();
		const siteApex = stripWww(s.hostname);
		const originHost = o.hostname.toLowerCase();
		const originApex = stripWww(originHost);
		if (originApex === siteApex) return true;
		if (originHost.endsWith("." + siteApex)) return true;
		return false;
	} catch {
		return false;
	}
}
