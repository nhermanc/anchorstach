/** @format */

import type { NextApiRequest, NextApiResponse } from "next";
import { serviceItems, workProjectItems } from "../../app/company-data";

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || "https://www.anchorstacktech.com";

const staticRoutes = [
	"",
	"/about-us",
	"/contact",
	"/services",
	"/work",
	"/blog",
	"/how-we-work",
	"/schedule-meeting",
	"/live-chat",
	"/hire-us",
];

function buildSitemapXml(): string {
	const now = new Date().toISOString().split("T")[0];

	const staticUrls = staticRoutes.map(
		(path) =>
			`  <url>\n    <loc>${SITE_URL}${path || "/"}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${path === "" ? "1.0" : "0.8"}</priority>\n  </url>`
	);

	const serviceUrls = serviceItems.map(
		(s) =>
			`  <url>\n    <loc>${SITE_URL}/service-detail?category=${encodeURIComponent(s.slug)}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
	);

	const workUrls = workProjectItems.map(
		(w) =>
			`  <url>\n    <loc>${SITE_URL}/work-detail?project=${encodeURIComponent(w.slug)}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
	);

	const urls = [...staticUrls, ...serviceUrls, ...workUrls].join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
): void {
	res.setHeader("Content-Type", "application/xml");
	res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
	res.status(200).send(buildSitemapXml());
}
