/** @format */

import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import ServicesComponent from "../components/services-page/services";
import { companyInfo } from "../app/company-data";
import { pageKeywords } from "../lib/seo-metadata";

const ServicesPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Software Development Services | Web, Mobile, AI, Blockchain - AnchorStackTech</title>
				<meta
					name="description"
					content="Explore our full range of software development services: custom web development, iOS & Android mobile apps, Odoo ERP implementation, blockchain solutions, AI integration, and desktop applications. Chicago-based team."
				/>
				<meta
					name="keywords"
					content={`${companyInfo.seoKeywords}, ${pageKeywords.services}`}
				/>
				<link rel="canonical" href={`${companyInfo.siteUrl}/services`} />
			</Head>
			<ServicesComponent />
		</React.Fragment>
	);
};

export default ServicesPage;
