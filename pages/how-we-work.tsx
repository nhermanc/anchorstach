/** @format */

import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import HowWeWorkComponent from "../components/how-we-work-page/how-we-work";
import { companyInfo } from "../app/company-data";

const HowWeWorkPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>How We Work | {companyInfo.name}</title>
				<meta
					name='description'
					content='Our software development process: Discovery, Design, Development, and Deployment. Learn how AnchorStackTech delivers quality products.'
				/>
			</Head>
			<HowWeWorkComponent />
		</>
	);
};

export default HowWeWorkPage;
