/** @format */

import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import MainNavigation from "../components/layout/main-navigation";
import { companyInfo } from "../app/company-data";

const LiveChatPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Live Chat | {companyInfo.name}</title>
				<meta name="description" content="Chat with AnchorStackTech on WhatsApp. Get quick answers about our software development services." />
			</Head>
			<MainNavigation />
			<Wrapper>
				<Card>
					<h1>Live Chat</h1>
					<p>
						You are now on the live chat page. Click the button below to
						start real-time chat with our team.
					</p>
					<ActionButton
						href={companyInfo.liveChatUrl}
						target='_blank'
						rel='noreferrer'>
						Start Chat on WhatsApp
					</ActionButton>
				</Card>
			</Wrapper>
		</>
	);
};

export default LiveChatPage;

const Wrapper = styled.section`
	min-height: 75vh;
	padding: 9rem 9% 4rem;
	background: #e5e5e5;
	display: grid;
	place-items: center;
`;

const Card = styled.div`
	width: 100%;
	max-width: 700px;
	background: #ffffff;
	border-radius: 12px;
	padding: 2rem;
	box-shadow: 0 2px 10px rgba(15, 11, 51, 0.1);

	h1 {
		margin-bottom: 0.8rem;
		color: #0f0b33;
	}

	p {
		color: #6f6d85;
		margin-bottom: 1.2rem;
	}
`;

const ActionButton = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-height: 46px;
	padding: 0.6rem 1rem;
	background: var(--color-secondary);
	border: 1px solid var(--color-secondary);
	color: white;
	font-weight: 700;
	border-radius: 6px;
`;
