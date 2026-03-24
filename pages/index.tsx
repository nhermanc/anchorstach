/** @format */

import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import HomePageComponent from "../components/home-page/home-page";
import { companyInfo } from "../app/company-data";
import { pageKeywords } from "../lib/seo-metadata";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>AnchorStackTech | Custom Software Development Company in Chicago</title>
				<meta name="description" content="AnchorStackTech is a Chicago-based software development company offering custom web development, mobile apps, Odoo ERP, blockchain, AI integration, and desktop software solutions. Free consultation available." />
				<meta
					name="keywords"
					content={`${companyInfo.seoKeywords}, ${pageKeywords.home}`}
				/>
				<link rel="canonical" href={companyInfo.siteUrl} />
				<link rel="preload" href="/home/slide1.webp" as="image" />
			</Head>
			<HomePageComponent />
		</>
	);
};

export default Home;
