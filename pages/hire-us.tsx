/** @format */

import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import HirUsPageComponent from "../components/hire-us-page/hir-us";
import MainNavigation from "../components/layout/main-navigation";
import { companyInfo } from "../app/company-data";
import { pageKeywords } from "../lib/seo-metadata";

const HirUsPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Hire Software Developers | Start Your Project Today - AnchorStackTech Chicago</title>
				<meta
					name="description"
					content="Hire AnchorStackTech's experienced software developers for your next project. We build custom web apps, mobile apps, Odoo ERP, blockchain, and AI solutions. Get started with a free project estimate."
				/>
				<meta
					name="keywords"
					content={`${companyInfo.seoKeywords}, ${pageKeywords.hireUs}`}
				/>
				<link rel="canonical" href={`${companyInfo.siteUrl}/hire-us`} />
			</Head>

			<MainNavigation />
			<HirUsPageComponent />
		</React.Fragment>
	);
};

export default HirUsPage;
