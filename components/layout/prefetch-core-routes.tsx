/** @format */

import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Main app routes (no querystrings). Prefetched after first paint so client-side
 * navigations hit the disk cache instead of waiting on the network at click time.
 * Critical for perceived speed on Next 11 Pages Router (especially when dev prefetch is weak).
 */
const CORE_PATHS = [
	"/",
	"/work",
	"/services",
	"/how-we-work",
	"/blog",
	"/about-us",
	"/contact",
	"/hire-us",
	"/live-chat",
	"/schedule-meeting",
	"/detail-blog",
	"/work-detail",
	"/service-detail",
];

/**
 * Renders nothing. Mount once from `_app.tsx`.
 */
export default function PrefetchCoreRoutes() {
	const router = useRouter();

	useEffect(() => {
		if (!router.isReady) return;
		const saveData =
			typeof navigator !== "undefined" &&
			(navigator as Navigator & { connection?: { saveData?: boolean } })
				.connection?.saveData;
		if (saveData) return;

		let cancelled = false;

		const run = async () => {
			for (const path of CORE_PATHS) {
				if (cancelled) return;
				if (path === router.pathname) continue;
				try {
					await router.prefetch(path);
				} catch {
					/* ignore failed prefetch (offline, 404 dev, etc.) */
				}
				await new Promise((r) => setTimeout(r, 35));
			}
		};

		const start = () => {
			void run();
		};

		let idleHandle = 0;
		if (typeof window !== "undefined" && "requestIdleCallback" in window) {
			idleHandle = window.requestIdleCallback(start, { timeout: 2500 });
		} else if (typeof window !== "undefined") {
			// Avoid TS narrowing `window` to `never` after `requestIdleCallback` `in` check
			idleHandle = globalThis.setTimeout(start, 600) as unknown as number;
		}

		return () => {
			cancelled = true;
			if (typeof window === "undefined") return;
			if ("cancelIdleCallback" in window) {
				window.cancelIdleCallback(idleHandle);
			}
			window.clearTimeout(idleHandle);
		};
	}, [router.isReady]);

	return null;
}
