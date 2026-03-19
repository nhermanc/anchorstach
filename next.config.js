/** @format */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
	const baseConfig = {
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
		// Required for `next export` (static / IONOS Deploy Now)
		images: {
			unoptimized: true,
			domains: [],
			deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
			imageSizes: [16, 32, 48, 64, 96, 128, 256],
		},
	};

	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return baseConfig;
	}

	return {
		...baseConfig,
	};
};
