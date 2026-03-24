/** @format */

import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import HowWeWorkComponent from "../components/how-we-work-page/how-we-work";
import { companyInfo } from "../app/company-data";
import { pageKeywords } from "../lib/seo-metadata";

const HowWeWorkPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Our Development Process | How We Build Software - AnchorStackTech</title>
				<meta
					name="description"
					content="Learn AnchorStackTech's agile software development process — from discovery and design to development and deployment. Transparent, collaborative, and built for quality results."
				/>
				<meta
					name="keywords"
					content={`${companyInfo.seoKeywords}, ${pageKeywords.howWeWork}`}
				/>
				<link rel="canonical" href={`${companyInfo.siteUrl}/how-we-work`} />
			</Head>
			<HowWeWorkComponent />
		</>
	);
};

export default HowWeWorkPage;
