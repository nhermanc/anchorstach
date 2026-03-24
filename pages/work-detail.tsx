/** @format */

import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import WorkDetailComponent from "../components/work-detail-page/work-detail";
import MainNavigation from "../components/layout/main-navigation";
import { companyInfo } from "../app/company-data";
import { pageKeywords } from "../lib/seo-metadata";

const BlogPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Project Case Study | Software Development Portfolio - AnchorStackTech</title>
				<meta name="description" content="See how AnchorStackTech delivered this custom software project — challenges, solutions, technologies used, and results. Browse our full development portfolio." />
				<meta
					name="keywords"
					content={`${companyInfo.seoKeywords}, ${pageKeywords.workDetail}`}
				/>
				<link rel="canonical" href={`${companyInfo.siteUrl}/work-detail`} />
			</Head>

			<MainNavigation />
			<WorkDetailComponent />
		</React.Fragment>
	);
};

export default BlogPage;
