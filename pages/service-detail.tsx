/** @format */

import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import ServiceDetailComponent from "../components/service-detail-page/service-detail";
import { companyInfo } from "../app/company-data";

const ServiceDetailPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>{`Service Detail | ${companyInfo.name}`}</title>
				<meta
					name='description'
					content='Detailed service category page with scope, deliverables, and related projects.'
				/>
			</Head>
			<ServiceDetailComponent />
		</React.Fragment>
	);
};

export default ServiceDetailPage;
