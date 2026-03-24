/** @format */

import React, { Fragment } from "react";
import Head from "next/head";
import type { NextPage } from "next";

import ContactComponent from "../components/contact-page/contact";
import { companyInfo } from "../app/company-data";
import { pageKeywords } from "../lib/seo-metadata";

const ContactPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Contact Us | Get a Free Software Development Quote - AnchorStackTech Chicago</title>
				<meta
					name="description"
					content="Contact AnchorStackTech for a free consultation on web development, mobile apps, Odoo ERP, blockchain, or AI projects. Based in Chicago, IL. Call +1 (312) 259-5012 or submit your request online."
				/>
				<meta
					name="keywords"
					content={`${companyInfo.seoKeywords}, ${pageKeywords.contact}`}
				/>
				<link rel="canonical" href={`${companyInfo.siteUrl}/contact`} />
			</Head>
			<ContactComponent />
		</React.Fragment>
	);
};

export default ContactPage;
