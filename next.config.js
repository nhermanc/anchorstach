/** @format */

/**
 * Single object export so `next export` always sees `images.unoptimized` (required for static / IONOS).
 * A phase-based function can be resolved differently during export on some Next.js versions.
 */
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	compress: true,
	poweredByHeader: false,
	async rewrites() {
		return [
			{ source: "/sitemap.xml", destination: "/api/sitemap" },
			{ source: "/robots.txt", destination: "/api/robots" },
		];
	},
	env: {
		NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN:
			process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN,
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
