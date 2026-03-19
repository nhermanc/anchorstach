/** @format */

import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import WorkComponent from "../components/work-page/work";
import { companyInfo } from "../app/company-data";

const WorkPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>{`Work | ${companyInfo.name}`}</title>
				<meta
					name='description'
					content='Selected web, app, Odoo, blockchain, AI, and desktop projects from AnchorStackTech.'
				/>
			</Head>
			<WorkComponent />
		</React.Fragment>
	);
};

export default WorkPage;
