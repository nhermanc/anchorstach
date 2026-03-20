/** @format */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

type AppShellProps = {
	children: React.ReactNode;
};

/**
 * - Removes the static boot splash from `_document` after hydration (covers styled-components FOUC).
 * - Subtle route transition: top accent bar + light content dim while Next.js loads the next page.
 */
export default function AppShell({ children }: AppShellProps) {
	const router = useRouter();
	const [routeBusy, setRouteBusy] = useState(false);

	useEffect(() => {
		const splash = document.getElementById("app-boot-splash");
		if (!splash) return;

		splash.setAttribute("aria-busy", "false");
		splash.classList.add("app-boot-splash--hide");
		const id = window.setTimeout(() => {
			splash.remove();
		}, 320);
		return () => window.clearTimeout(id);
	}, []);

	useEffect(() => {
		const onStart = () => setRouteBusy(true);
		const onEnd = () => setRouteBusy(false);

		router.events.on("routeChangeStart", onStart);
		router.events.on("routeChangeComplete", onEnd);
		router.events.on("routeChangeError", onEnd);

		return () => {
			router.events.off("routeChangeStart", onStart);
			router.events.off("routeChangeComplete", onEnd);
			router.events.off("routeChangeError", onEnd);
		};
	}, [router]);

	return (
		<>
			<div
				className='route-progress-bar'
				data-visible={routeBusy ? "true" : "false"}
				aria-hidden='true'
			/>
			<div
				className={
					routeBusy ? "page-transition-wrap page-transition-wrap--busy" : "page-transition-wrap"
				}>
				{children}
			</div>
		</>
	);
}
