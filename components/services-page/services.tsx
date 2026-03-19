/** @format */

import React, { FC, memo } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import MainNavigation from "../layout/main-navigation";
import { serviceItems } from "../../app/company-data";

const ServicesComponent: FC = () => {
	const router = useRouter();

	return (
		<>
			<MainNavigation />
			<Wrapper>
				<Container>
					<h2>SERVICES</h2>
					<h1 style={{ color: "var(--color-grey-800)" }}>Complete technology delivery for modern businesses</h1>
					<p>
						We currently use static content while shaping your platform.
						Each service below can be expanded into dedicated pages and
						case studies in the next steps.
					</p>

					<Grid>
						{serviceItems.map((service) => (
							<Card
								key={service.slug}
								onClick={() => {
									router.push({
										pathname: "/service-detail",
										query: { category: service.slug },
									});
								}}>
								<h3 style={{ color: "var(--color-grey-800)" }}>{service.title}</h3>
								<p>{service.description}</p>
							</Card>
						))}
					</Grid>

					<ActionButton
						onClick={() => {
							router.push("/contact");
						}}>
						GET STARTED
					</ActionButton>
				</Container>
			</Wrapper>
		</>
	);
};

export default memo(ServicesComponent);

const Wrapper = styled.section`
	background: #e5e5e5;
	min-height: 100vh;
	padding: 10rem 9% 6rem;
`;

const Container = styled.div`
	max-width: var(--max-width1250);
	margin: 0 auto;

	h2 {
		color: var(--color-secondary-second);
		margin-bottom: 1.25rem;
	}

	h1 {
		color: var(--color-primary);
		font-size: 2rem;
		line-height: 1.4;
		max-width: 46rem;
		margin-bottom: 1rem;
	}

	p {
		color: #6f6d85;
		line-height: var(--line-height);
		max-width: 48rem;
		margin-bottom: 2rem;
	}
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 1rem;

	@media (max-width: 992px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (max-width: 640px) {
		grid-template-columns: 1fr;
	}
`;

const Card = styled.article`
	background: white;
	padding: 1.25rem;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	border-left: 4px solid var(--color-secondary-second);
	cursor: pointer;
	display: flex;
	flex-direction: column;
	min-height: 220px;

	h3 {
		color: var(--color-primary);
		margin-bottom: 0.75rem;
		font-size: 1.1rem;
	}

	p {
		margin: 0 0 1rem 0;
		font-size: 0.95rem;
	}
`;

const CardButton = styled.button`
	margin-top: auto;
	width: fit-content;
	height: 42px;
	padding: 0.35rem 0.9rem;
	border: 1px solid #0f0b33;
	background: #0f0b33;
	color: white;
	font-weight: 700;
	border-radius: 4px;
	cursor: pointer;
`;

const ActionButton = styled.button`
	margin-top: 2rem;
	min-width: 160px;
	height: 48px;
	border: 1px solid #0f0b33;
	background: #0f0b33;
	color: white;
	font-weight: bold;
	border-radius: 4px;
	cursor: pointer;
`;
