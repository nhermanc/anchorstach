/**
 * Writes sitemap.xml and robots.txt into public/ before static export.
 * Run automatically as part of npm run build:static / build:deploy.
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const companyDataPath = join(root, "app", "company-data.ts");

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || "https://anchorstacktech.com";

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

/** Extract content of top-level `export const name = [` ... `];` array */
function extractArrayBlock(ts, exportName) {
	const needle = `export const ${exportName}`;
	const start = ts.indexOf(needle);
	if (start === -1) return "";
	const eq = ts.indexOf("= [", start);
	if (eq === -1) return "";
	let i = eq + 2; // '['
	let depth = 0;
	for (; i < ts.length; i++) {
		const c = ts[i];
		if (c === "[") depth++;
		else if (c === "]") {
			depth--;
			if (depth === 0) return ts.slice(eq + 3, i);
		}
	}
	return "";
}

function collectMatches(text, regex) {
	const out = [];
	let m;
	while ((m = regex.exec(text)) !== null) out.push(m[1]);
	return out;
}

function main() {
	const ts = readFileSync(companyDataPath, "utf8");

	const serviceBlock = extractArrayBlock(ts, "serviceItems");
	const workBlock = extractArrayBlock(ts, "workProjectItems");
	const blogBlock = extractArrayBlock(ts, "blogItems");

	const serviceSlugs = collectMatches(serviceBlock, /slug:\s*"([^"]+)"/g);
	const workSlugs = collectMatches(workBlock, /slug:\s*"([^"]+)"/g);
	const blogIds = collectMatches(blogBlock, /id:\s*"([^"]+)"/g);

	const now = new Date().toISOString().split("T")[0];
	const urls = [];

	for (const path of staticRoutes) {
		urls.push({
			loc: `${SITE_URL}${path || "/"}`,
			lastmod: now,
			changefreq: "weekly",
			priority: path === "" ? "1.0" : "0.8",
		});
	}
	for (const slug of serviceSlugs) {
		urls.push({
			loc: `${SITE_URL}/service-detail?category=${encodeURIComponent(slug)}`,
			lastmod: now,
			changefreq: "monthly",
			priority: "0.7",
		});
	}
	for (const slug of workSlugs) {
		urls.push({
			loc: `${SITE_URL}/work-detail?project=${encodeURIComponent(slug)}`,
			lastmod: now,
			changefreq: "monthly",
			priority: "0.7",
		});
	}
	for (const id of blogIds) {
		urls.push({
			loc: `${SITE_URL}/detail-blog?blog=${encodeURIComponent(id)}`,
			lastmod: now,
			changefreq: "monthly",
			priority: "0.7",
		});
	}

	const urlXml = urls
		.map(
			(u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
		)
		.join("\n");

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlXml}
</urlset>`;

	const robots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml
`;

	writeFileSync(join(root, "public", "sitemap.xml"), sitemap, "utf8");
	writeFileSync(join(root, "public", "robots.txt"), robots, "utf8");
	console.log("Wrote public/sitemap.xml and public/robots.txt");
}

main();
