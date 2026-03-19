/** @format */

import React, { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import BlogComponent from "../components/blog-page/blog";
import { companyInfo } from "../app/company-data";

const BlogPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Blog | {companyInfo.name} - Software & Tech Insights</title>
				<meta
					name="description"
					content="Articles and insights on web development, mobile apps, Odoo, AI, and software best practices from the AnchorStackTech team."
				/>
			</Head>
			<BlogComponent />
		</React.Fragment>
	);
};

export default BlogPage;
