/** @format */

import React from "react";
import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import styled from "styled-components";

import MainNavigation from "../components/layout/main-navigation";
import { companyInfo } from "../app/company-data";

const ThankYouPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>{`Thank you | ${companyInfo.name}`}</title>
				<meta
					name='description'
					content={`Thank you for contacting ${companyInfo.name}. We will get back to you soon.`}
				/>
				<link rel='canonical' href={`${companyInfo.siteUrl}/thank-you`} />
				<meta name='robots' content='noindex, follow' />
			</Head>
			<MainNavigation />
			<Section>
				<Inner>
					<h1>Thank you</h1>
					<p>
						We’ve received your message and will get back to you as soon as we
						can.
					</p>
					<p>
						<Link href='/' passHref>
							<BackLink>Return to home</BackLink>
						</Link>
						{" · "}
						<Link href='/contact' passHref>
							<BackLink>Send another message</BackLink>
						</Link>
					</p>
				</Inner>
			</Section>
		</>
	);
};

export default ThankYouPage;

const Section = styled.main`
	min-height: calc(100vh - 8rem);
	padding: 8rem clamp(1rem, 4vw, 9%) 4rem;
	background: #f8fafc;
	color: #0f0b33;
	box-sizing: border-box;
`;

const Inner = styled.div`
	max-width: 36rem;
	margin: 0 auto;
	text-align: center;

	h1 {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		margin-bottom: 1rem;
		font-weight: 700;
	}

	p {
		line-height: 1.7;
		font-size: 1.1rem;
		margin-bottom: 1.5rem;
		color: #3d3a54;
	}
`;

const BackLink = styled.a`
	color: var(--color-secondary, #00d0b0);
	font-weight: 600;
	text-decoration: none;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;
