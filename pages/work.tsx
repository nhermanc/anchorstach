/** @format */

import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import WorkComponent from "../components/work-page/work";
import { companyInfo } from "../app/company-data";
import { pageKeywords } from "../lib/seo-metadata";

const WorkPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Our Work & Portfolio | Custom Software Projects - AnchorStackTech</title>
				<meta
					name="description"
					content="Browse AnchorStackTech's portfolio of custom software projects including web applications, mobile apps, Odoo ERP solutions, blockchain platforms, and AI integrations built for clients worldwide."
				/>
				<meta
					name="keywords"
					content={`${companyInfo.seoKeywords}, ${pageKeywords.work}`}
				/>
				<link rel="canonical" href={`${companyInfo.siteUrl}/work`} />
			</Head>
			<WorkComponent />
		</React.Fragment>
	);
};

export default WorkPage;
