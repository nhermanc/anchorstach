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
		"@type": "ProfessionalService",
		"@id": `${siteUrl}#organization`,
		name: companyInfo.name,
		description: pageDescription,
		url: siteUrl,
		email: companyInfo.email,
		telephone: companyInfo.phone,
		address: {
			"@type": "PostalAddress",
			streetAddress: "6550 N. Damen Ave. Apartment 107",
			addressLocality: "Chicago",
			addressRegion: "IL",
			postalCode: "60645",
			addressCountry: "US",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: 41.9981,
			longitude: -87.6792,
		},
		logo: `${siteUrl}${companyInfo.logoPath}`,
		image: `${siteUrl}${companyInfo.logoPath}`,
		priceRange: "$$",
		areaServed: [
			{ "@type": "City", name: "Chicago" },
			{ "@type": "Country", name: "United States" },
		],
		knowsAbout: [
			"Web Development",
			"Mobile App Development",
			"Odoo ERP",
			"Blockchain Development",
			"Artificial Intelligence",
			"Desktop Software",
			"Custom Software Development",
		],
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Software Development Services",
			itemListElement: [
				{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
				{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development" } },
				{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Odoo ERP Customization" } },
				{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Blockchain Solutions" } },
				{ "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Integration" } },
				{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Desktop Application Development" } },
			],
		},
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
					<meta name="keywords" content={companyInfo.seoKeywords} />
					<meta name="author" content={companyInfo.name} />
					<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
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
