/** @format */

import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import HomePageComponent from "../components/home-page/home-page";
import { companyInfo } from "../app/company-data";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>{companyInfo.name} | {companyInfo.tagline}</title>
				<meta name="description" content={companyInfo.seoDescription} />
				<link rel="canonical" href={companyInfo.siteUrl} />
				<link rel="preload" href="/home/slide1.webp" as="image" />
			</Head>
			<HomePageComponent />
		</>
	);
};

export default Home;
