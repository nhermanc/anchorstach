/**
 * Ensures `next.config.js` sees a stable signal for dev-only `distDir` (`.next-dev`).
 * Relying on `process.argv[2] === "dev"` can break if Next or tooling loads config
 * with different argv → wrong `distDir` → missing `static/chunks/fallback/*` (404).
 */
process.env.NEXT_USE_DEV_DIST = "true";

const { spawnSync } = require("child_process");
const path = require("path");

const nextBin = path.join(__dirname, "..", "node_modules", "next", "dist", "bin", "next");
const result = spawnSync(
	process.execPath,
	["--openssl-legacy-provider", nextBin, "dev", ...process.argv.slice(2)],
	{ stdio: "inherit", env: process.env },
);

process.exit(result.status ?? 1);
