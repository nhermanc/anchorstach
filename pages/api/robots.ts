/** @format */

import type { NextApiRequest, NextApiResponse } from "next";

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || "https://www.anchorstacktech.com";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
): void {
	const robots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml
`;
	res.setHeader("Content-Type", "text/plain");
	res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
	res.status(200).send(robots);
}
