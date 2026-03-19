/** @format */

import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import ServicesComponent from "../components/services-page/services";
import { companyInfo } from "../app/company-data";

const ServicesPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>{`Services | ${companyInfo.name}`}</title>
				<meta
					name='description'
					content='Explore AnchorStackTech services: web development, app development, Odoo, blockchain, AI integration, and desktop software.'
				/>
			</Head>
			<ServicesComponent />
		</React.Fragment>
	);
};

export default ServicesPage;
