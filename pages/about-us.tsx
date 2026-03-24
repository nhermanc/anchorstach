/** @format */

import type { NextPage } from "next";
import Head from "next/head";
import React, { Fragment } from "react";

import AboutUsComponent from "../components/about-us-page/about-us";
import { companyInfo } from "../app/company-data";
import { pageKeywords } from "../lib/seo-metadata";

const AboutUsPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>About AnchorStackTech | Chicago Software Development Team & Mission</title>
				<meta
					name="description"
					content="Learn about AnchorStackTech — a Chicago-based software development team building custom web, mobile, Odoo ERP, blockchain, and AI solutions. Discover our mission, values, and development process."
				/>
				<meta
					name="keywords"
					content={`${companyInfo.seoKeywords}, ${pageKeywords.about}`}
				/>
				<link rel="canonical" href={`${companyInfo.siteUrl}/about-us`} />
			</Head>
			<AboutUsComponent />
		</React.Fragment>
	);
};

export default AboutUsPage;
