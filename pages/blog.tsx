/** @format */

import React, { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import BlogComponent from "../components/blog-page/blog";
import { companyInfo } from "../app/company-data";
import { pageKeywords } from "../lib/seo-metadata";

const BlogPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Tech Blog | Software Development Insights & Tutorials - AnchorStackTech</title>
				<meta
					name="description"
					content="Read expert articles on web development, mobile app development, Odoo ERP, blockchain technology, AI integration, and software engineering best practices from the AnchorStackTech team in Chicago."
				/>
				<meta
					name="keywords"
					content={`${companyInfo.seoKeywords}, ${pageKeywords.blog}`}
				/>
				<link rel="canonical" href={`${companyInfo.siteUrl}/blog`} />
			</Head>
			<BlogComponent />
		</React.Fragment>
	);
};

export default BlogPage;
