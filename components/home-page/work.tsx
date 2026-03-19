/** @format */

import styled from "styled-components";
import { useRouter } from "next/router";
import React, { FC, useMemo, useState } from "react";

import GridItem from "../work-page/grid-item";
import { serviceItems, workProjectItems } from "../../app/company-data";

const categoryAliases: Record<string, string[]> = {
	"Web Solutions": ["Web Development", "Custom Software"],
	"Mobile App Solutions": ["App Development", "Mobile App Solutions"],
	"ERP & Business Systems": ["Odoo Development", "Business Systems"],
	"Blockchain Solutions": ["Blockchain Solutions"],
	"AI Solutions": ["AI Integration & Platforms"],
	"Desktop Software": ["Desktop Software"],
};

const Work: FC = () => {
	const router = useRouter();
	const [activeCategory, setActiveCategory] = useState<string>(
		serviceItems[0]?.title || "",
	);

	const filteredProjects = useMemo(() => {
		const categoryMatchers = [
			activeCategory,
			...(categoryAliases[activeCategory] || []),
		];

		const matched = workProjectItems.filter((project) =>
			categoryMatchers.includes(project.category),
		);

		return matched.slice(0, 3);
	}, [activeCategory]);

	return (
		<WorkWrapper>
			<CustomContainer>
				<SectionHeader>
					<h2>OUR WORK</h2>
					<p>Recent projects delivered with measurable impact</p>
					<Department>
						{serviceItems.map((service) => (
							<button
								key={service.slug}
								className={
									activeCategory === service.title ? "main-btn" : ""
								}
								onClick={() => setActiveCategory(service.title)}>
								{service.title}
							</button>
						))}
					</Department>
				</SectionHeader>
			</CustomContainer>

			<CustomContainer>
				<GridContainer>
					{filteredProjects.map((item) => (
						<GridItem
							key={item.slug}
							src={item.image}
							title={item.title}
							category={item.category}
							slug={item.slug}
						/>
					))}
				</GridContainer>
			</CustomContainer>

			<HiddenOnSmall>
				<h2>OUR WORK</h2>
				<p className='head-co'>Recent projects delivered with impact</p>
			</HiddenOnSmall>

			<CustomButton
				onClick={() => {
					router.push("/work");
				}}>
				VIEW ALL WORK
			</CustomButton>
		</WorkWrapper>
	);
};

export default Work;

const WorkWrapper = styled.section`
	position: relative;
	min-height: auto;
	padding: 3.5rem 9% !important;
	background: #eef2f7;
	color: #0f0b33;
	@media (min-width: 768px) {
		padding: 4.5rem 9% !important;
	}
`;

const CustomContainer = styled.div`
	width: 100%;
	max-width: var(--max-width1250);
	overflow: hidden;
	margin: 0 auto;
	position: relative;
`;

const GridContainer = styled.div`
	width: 100%;
	max-width: var(--max-width1250);
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 1.5rem;
	margin: 0 auto;

	@media (max-width: 992px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (max-width: 600px) {
		grid-template-columns: 1fr;
	}
`;

const SectionHeader = styled.div`
	text-align: center;
	margin-bottom: 2rem;

	h2 {
		color: var(--color-secondary-second);
		margin-bottom: 0.9rem;
	}

	p {
		color: #0f0b33;
		font-size: clamp(1.35rem, 3.8vw, 3rem);
		font-weight: 700;
		line-height: 1.35;
		max-width: 700px;
		margin: 0 auto;
	}
`;

const Department = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 0.75rem;
	margin-top: 1.4rem;

	button {
		min-height: 42px;
		cursor: pointer;
		font: inherit;
		background-color: #d5d8df;
		border: 1px solid #d5d8df;
		border-radius: 30px;
		padding: 0.7rem 1rem;
		transition-duration: var(--transition-duration);
		display: block;
		font-weight: bold;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
		color: #0f0b33;
		@media (max-width: 768px) {
			font-size: 0.9rem;
		}
	}

	button.main-btn {
		border-color: #0f0b33;
		background-color: #0f0b33;
		color: white;
	}
`;

const HiddenOnSmall = styled.div`
	display: none;
	@media (max-width: 480px) {
		display: block;
		text-align: center;
		margin-top: 1.75rem;

		h2 {
			color: var(--color-secondary-second);
			margin-bottom: 0.5rem;
		}

		p {
			color: #0f0b33;
		}
	}
`;

const CustomButton = styled.button`
	margin: 0 auto;
	display: block;
	min-width: 164px;
	min-height: 53px;
	font: inherit;
	cursor: pointer;
	font-weight: bold;
	background-color: #0f0b33;
	border: 1px solid #0f0b33;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	transition-duration: var(--transition-duration);
	color: white;
	margin-top: 2rem;
	display: block;
	@media (max-width: 568px) {
		width: 80%;
	}
	&:hover {
		background: #1d1852;
		border-color: #1d1852;
	}
`;
