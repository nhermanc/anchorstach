/** @format */

import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import MainNavigation from "../components/layout/main-navigation";
import { companyInfo } from "../app/company-data";

const ScheduleMeetingPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Schedule Meeting | {companyInfo.name}</title>
				<meta
					name="description"
					content="Schedule a meeting with AnchorStackTech. Book a consultation for web, app, Odoo, or AI projects via Google Calendar."
				/>
			</Head>
			<MainNavigation />
			<Wrapper>
				<Card>
					<h1>Schedule a Meeting</h1>
					<p>
						Book your meeting in Google Calendar. Add your project summary,
						preferred time, and participants in the booking screen.
					</p>
					<ActionButton
						href={companyInfo.googleCalendarBookingUrl}
						target='_blank'
						rel='noreferrer'>
						Open Google Calendar Booking
					</ActionButton>
				</Card>
			</Wrapper>
		</>
	);
};

export default ScheduleMeetingPage;

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
