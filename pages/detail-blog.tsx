/** @format */

import React, { Fragment } from "react";
import Head from "next/head";
import type { NextPage } from "next";

import BlogDetailComponent from "../components/blog-detail-page/blog-detail";
import { companyInfo } from "../app/company-data";
import { pageKeywords } from "../lib/seo-metadata";

const HirUsPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Blog Article | Software Development Insights - AnchorStackTech</title>
				<meta
					name="description"
					content="Read expert insights on software development, web technologies, mobile apps, AI, and industry best practices from the AnchorStackTech team in Chicago."
				/>
				<meta
					name="keywords"
					content={`${companyInfo.seoKeywords}, ${pageKeywords.blogDetail}`}
				/>
				<link rel="canonical" href={`${companyInfo.siteUrl}/detail-blog`} />
			</Head>

			<BlogDetailComponent />
		</React.Fragment>
	);
};

export default HirUsPage;
