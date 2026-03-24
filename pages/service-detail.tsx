/** @format */

import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import ServiceDetailComponent from "../components/service-detail-page/service-detail";
import { companyInfo } from "../app/company-data";
import { pageKeywords } from "../lib/seo-metadata";

const ServiceDetailPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Service Details | Custom Software Development Solutions - AnchorStackTech</title>
				<meta
					name="description"
					content="Explore detailed service offerings from AnchorStackTech — scope, deliverables, and related projects for web, mobile, Odoo ERP, blockchain, AI, and desktop development."
				/>
				<meta
					name="keywords"
					content={`${companyInfo.seoKeywords}, ${pageKeywords.serviceDetail}`}
				/>
				<link rel="canonical" href={`${companyInfo.siteUrl}/service-detail`} />
			</Head>
			<ServiceDetailComponent />
		</React.Fragment>
	);
};

export default ServiceDetailPage;
