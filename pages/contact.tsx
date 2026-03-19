/** @format */

import React, { Fragment } from "react";
import Head from "next/head";
import type { NextPage } from "next";

import ContactComponent from "../components/contact-page/contact";
import { companyInfo } from "../app/company-data";

const ContactPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>{`Contact | ${companyInfo.name}`}</title>
				<meta
					name="description"
					content={`Contact ${companyInfo.name} for web, app, Odoo, blockchain, AI integration, and desktop projects.`}
				/>
				<link rel="canonical" href={`${companyInfo.siteUrl}/contact`} />
			</Head>
			<ContactComponent />
		</React.Fragment>
	);
};

export default ContactPage;
