/** @format */

const path = require("path");

/**
 * `next dev` and `next build` must not share the same output folder.
 * Use env (set by `scripts/run-dev.cjs`) — not `process.argv`, because config can load
 * with different argv in subprocesses → wrong distDir → 404 on `chunks/fallback/*`.
 *
 * `npm run build` / `next start` / `next export`: unset → `.next`
 */
const distDir =
	process.env.NEXT_USE_DEV_DIST === "true" ? ".next-dev" : ".next";

/**
 * Public contact API (Render `servers/contact-submit`). Must match your Render service URL.
 * Override with env `NEXT_PUBLIC_CONTACT_SUBMIT_API_URL` if Render assigns a different hostname.
 */
const DEFAULT_CONTACT_SUBMIT_API_URL =
	"https://anchorstacktech-contact-api.onrender.com/api/submit-inquiry";

/**
 * Single object export so `next export` always sees `images.unoptimized` (required for static / IONOS).
 * A phase-based function can be resolved differently during export on some Next.js versions.
 */
const withAnalyzer =
	process.env.ANALYZE === "true"
		? require("webpack-bundle-analyzer").BundleAnalyzerPlugin
		: null;

module.exports = {
	distDir,
	/** Avoid build failures when CI omits devDependencies or ESLint resolution differs (run `npm run lint` locally). */
	eslint: {
		ignoreDuringBuilds: true,
	},
	/**
	 * Public reCAPTCHA v2 site key (safe in the client bundle). Override via env in CI if you rotate keys.
	 */
	env: {
		NEXT_PUBLIC_RECAPTCHA_SITE_KEY:
			process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
			"6LcK4JEsAAAAAEVfrg8Frb7d6sS-0TuysfSNHexl",
		NEXT_PUBLIC_CONTACT_SUBMIT_API_URL:
			process.env.NEXT_PUBLIC_CONTACT_SUBMIT_API_URL?.trim() ||
			DEFAULT_CONTACT_SUBMIT_API_URL,
	},
	reactStrictMode: true,
	swcMinify: true,
	compress: true,
	poweredByHeader: false,
	productionBrowserSourceMaps: false,
	webpack(config, { isServer }) {
		if (withAnalyzer) {
			config.plugins.push(
				new withAnalyzer({
					analyzerMode: "static",
					reportFilename: path.join(
						__dirname,
						"analyze",
						isServer ? "server.html" : "client.html",
					),
					openAnalyzer: true,
				}),
			);
		}
		return config;
	},
	async rewrites() {
		return [
			{ source: "/sitemap.xml", destination: "/api/sitemap" },
			{ source: "/robots.txt", destination: "/api/robots" },
		];
	},
	/**
	 * Long cache for hashed static chunks (helps Lighthouse "cache TTL" when using `next start` or
	 * platforms that honor these headers). `next export` → static files on disk: set equivalent rules
	 * on IONOS / CDN (see docs/IONOS_STATIC_DEPLOY.md).
	 */
	async headers() {
		return [
			{
				source: "/_next/static/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/_next/image",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=86400, stale-while-revalidate=604800",
					},
				],
			},
		];
	},
	// Next.js 11: `next export` only skips the image check when loader !== 'default'.
	// `images.unoptimized` alone does NOT satisfy that check (Next 11 bug/oversight).
	// Akamai loader + path "/" yields normal paths like /foo.jpg?imwidth=… (fine on static hosts).
	images: {
		loader: "akamai",
		path: "/",
		unoptimized: true,
		domains: [],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
		imageSizes: [16, 32, 48, 64, 96, 128, 256],
	},
};
