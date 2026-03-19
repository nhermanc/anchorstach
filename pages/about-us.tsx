/** @format */

import type { NextPage } from "next";
import Head from "next/head";
import React, { Fragment } from "react";

import AboutUsComponent from "../components/about-us-page/about-us";
import { companyInfo } from "../app/company-data";

const AboutUsPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>About Us | {companyInfo.name} - Software Development Company</title>
				<meta
					name="description"
					content="AnchorStackTech is a software development company delivering web, mobile, Odoo, AI, and blockchain solutions. Learn about our team, process, and commitment to quality."
				/>
			</Head>
			<AboutUsComponent />
		</React.Fragment>
	);
};

export default AboutUsPage;
