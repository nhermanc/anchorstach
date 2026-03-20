/**
 * Production bundle analysis (webpack-bundle-analyzer).
 * Opens static HTML reports after `next build`.
 */
process.env.ANALYZE = "true";

const { spawnSync } = require("child_process");
const path = require("path");

const nextBin = path.join(__dirname, "..", "node_modules", "next", "dist", "bin", "next");
const r = spawnSync(
	process.execPath,
	["--openssl-legacy-provider", nextBin, "build"],
	{ stdio: "inherit", cwd: path.join(__dirname, ".."), env: process.env },
);
process.exit(r.status ?? 1);
