/** @format */

import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import HirUsPageComponent from "../components/hire-us-page/hir-us";
import MainNavigation from "../components/layout/main-navigation";
import { companyInfo } from "../app/company-data";

const HirUsPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Hire Us | {companyInfo.name} - Start Your Project</title>
				<meta
					name='description'
					content='Let’s get to work! Hire AnchorStackTech for your next software project. Answer a few questions and get started with web, app, Odoo, or AI development.'
				/>
			</Head>

			<MainNavigation />
			<HirUsPageComponent />
		</React.Fragment>
	);
};

export default HirUsPage;
