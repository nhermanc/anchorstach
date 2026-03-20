/** @format */

import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GoogleTagManager } from "@next/third-parties/google";

import "../styles/globals.css";
import Layout from "../components/layout/layout";
import AppShell from "../components/layout/app-shell";
import PrefetchCoreRoutes from "../components/layout/prefetch-core-routes";
import { companyInfo } from "../app/company-data";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const siteUrl = companyInfo.siteUrl;
	const canonicalPath = router.asPath === "/" ? "" : router.asPath;
	const canonicalUrl = `${siteUrl}${canonicalPath}`;
	const pageTitle = companyInfo.name;
	const pageDescription = companyInfo.seoDescription;
	const ogImage = `${siteUrl}${companyInfo.logoPath}`;

	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": `${siteUrl}#organization`,
		name: companyInfo.name,
		description: pageDescription,
		url: siteUrl,
		email: companyInfo.email,
		telephone: companyInfo.phone,
		address: {
			"@type": "PostalAddress",
			streetAddress: companyInfo.address,
		},
		logo: `${siteUrl}${companyInfo.logoPath}`,
	};

	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: companyInfo.name,
		url: siteUrl,
		description: pageDescription,
		publisher: { "@id": `${siteUrl}#organization` },
	};

	const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
	const gtmId =
		process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-PHPX26N3";

	return (
		<Layout>
				<GoogleTagManager gtmId={gtmId} />
				<PrefetchCoreRoutes />
				<Head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<title>{pageTitle}</title>
					<meta name="description" content={pageDescription} />
					<link rel="canonical" href={canonicalUrl} />
					<link rel="icon" href={companyInfo.faviconPath} />
					{googleVerification && (
						<meta name="google-site-verification" content={googleVerification} />
					)}

					{/* Open Graph */}
					<meta property="og:type" content="website" />
					<meta property="og:url" content={canonicalUrl} />
					<meta property="og:title" content={pageTitle} />
					<meta property="og:description" content={pageDescription} />
					<meta property="og:image" content={ogImage} />
					<meta property="og:site_name" content={companyInfo.name} />
					<meta property="og:locale" content="en_US" />

					{/* Twitter Card */}
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:title" content={pageTitle} />
					<meta name="twitter:description" content={pageDescription} />
					<meta name="twitter:image" content={ogImage} />

					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify([organizationSchema, websiteSchema]),
						}}
					/>
				</Head>
				<AppShell>
					<Component {...pageProps} />
				</AppShell>
			</Layout>
	);
}
export default MyApp;
