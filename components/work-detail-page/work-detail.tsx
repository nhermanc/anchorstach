/** @format */

import styled from "styled-components";
import { FC, memo } from "react";
import Image from "next/image";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useRouter } from "next/router";

import GridItem from "../work-page/grid-item";
import UIParagraph from "../ui/paragraph";
import {
	getWorkProjectBySlug,
	workProjectItems,
} from "../../app/company-data";

const WorkDetailComponent: FC = () => {
	const router = useRouter();
	const queryProject =
		typeof router.query.project === "string" ? router.query.project : "";
	const project = getWorkProjectBySlug(queryProject) || workProjectItems[0];

	return (
		<Wrapper style={{ position: "relative" }}>
			<CustomContainer>
				<section>
					<h2>DETAIL WORK</h2>
					<div className='inner-container'>
						<div>
							<h1 style={{ color: "var(--color-grey-800)" }}>{project.title}</h1>

							<div className='project'>
								<p>Project Type</p>
								<h3 style={{ color: "var(--color-grey-500)" }}>{project.category}</h3>
							</div>
						</div>
						<div>
							<UIParagraph>{project.overview}</UIParagraph>
							<UIParagraph>
								This project was delivered with a structured implementation
								process, measurable milestones, and production-grade quality
								controls.
							</UIParagraph>
							{project.liveLink ? (
								<LivePreviewLink
									href={project.liveLink}
									target='_blank'
									rel='noopener noreferrer'>
									LIVE PREVIEW
								</LivePreviewLink>
							) : (
								<CustomButton disabled>LIVE PREVIEW</CustomButton>
							)}
						</div>
					</div>

					<HiddenImageContainer>
						<Image
							src={project.image}
							alt='Hero Image'
							width={500}
							height={400}
							layout='responsive'
						/>
					</HiddenImageContainer>
				</section>

				<ImageSection>
					<ImageContainer
						style={{
							position: "relative",
							cursor: "pointer",
						}}>
						<Image
							src={project.image}
							alt='qsak Image'
							layout='fill'
							objectFit='cover'
						/>
					</ImageContainer>
				</ImageSection>

				<FeatureSection>
					<div>
						{project.highlights.map((item) => (
							<p key={`${project.slug}-left-${item}`}>
								<FiberManualRecordIcon
									style={{
										color: "#00d0b0",
										fontSize: "1.3rem",
										marginRight: "10px",
									}}
								/>
								<span>{item}</span>
							</p>
						))}
					</div>
					<div>
						{project.highlights.map((item) => (
							<p key={`${project.slug}-right-${item}`}>
								<FiberManualRecordIcon
									style={{
										color: "#00d0b0",
										fontSize: "1.3rem",
										marginRight: "10px",
									}}
								/>
								<span>{item}</span>
							</p>
						))}
					</div>
				</FeatureSection>

				<RelatedWork>
					<h2>THERE’S MORE</h2>
					<h2 style={{ color: "var(--color-grey-800)" }}>Explore Other Works</h2>

					<GridWrapper>
						<GridContainer>
							{workProjectItems.slice(0, 3).map((item) => (
								<GridItem
									key={`related-${item.title}`}
									src={item.image}
									title={item.title}
									category={item.category}
									slug={item.slug}
								/>
							))}
						</GridContainer>
					</GridWrapper>
				</RelatedWork>
			</CustomContainer>
		</Wrapper>
	);
};

export default memo(WorkDetailComponent);

const CustomContainer = styled.div`
	width: 100%;
	max-width: var(--max-width);
	overflow: hidden;
`;

const Wrapper = styled.div`
	background: #e5e5e5;
	display: grid;
	place-items: center;
	position: relative;
	width: 100vw;
	padding: 5rem 9% !important;
	padding-top: 8.5rem !important;
	@media (min-width: 768px) {
		padding: 8rem 9% !important;
		padding-top: 11rem !important;
		min-height: 100vh;
		padding-bottom: 10rem !important;
	}

	section {
		max-width: 73.125rem;
		margin: 0 auto;

		h2 {
			text-align: left;
			margin-bottom: 2rem;
			font-size: 1.3rem;
			color: var(--color-secondary-second);
		}

		h1 {
			font-weight: bold;
			font-size: 3.25rem;
			color: var(--color-primary);
			margin-bottom: 2rem;
			max-width: 29.688rem;

			@media (max-width: 568px) {
				font-size: 1.4rem;
				width: 100%;
			}

			@media (min-width: 991px) {
				font-size: 2rem;
				min-width: 29.813rem;
				font-style: normal;
				font-weight: bold;
				font-size: 52px;
				line-height: 150%;
			}
		}
	}

	.inner-container {
		display: flex;
		justify-content: space-between;

		@media (max-width: 992px) {
			flex-wrap: wrap;
		}

		p {
			line-height: var(--line-height);
			color: #878599;
			max-width: 36.625rem;
			@media (min-width: 768px) {
				font-size: 1.1rem;
				width: 36.625rem;
			}
		}
	}

	.project {
		display: none;
		@media (min-width: 991px) {
			margin-top: 6rem;
			display: block;
		}

		font-size: 1rem;
		p {
			padding-left: 1rem;
			border-left: 2px solid var(--color-secondary);
		}

		h3 {
			color: var(--color-primary);
			font-style: normal;
			font-weight: bold;
			line-height: 150%;
			margin-top: 1rem;
		}
	}
`;

const HiddenImageContainer = styled.div`
	width: 100%;
	max-height: 20rem;
	overflow: hidden;
	margin-top: 5rem;
	margin-bottom: 2rem;
	@media (min-width: 768px) {
		display: none;
	}

	img {
		object-fit: cover;
		display: block;
	}
`;

const ImageSection = styled.div`
	max-width: 73.125rem;
	height: 33.813rem;
	width: 100%;
	margin: 6rem auto;

	transition: var(--transition-duration);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	background: linear-gradient(180deg, rgba(15, 11, 51, 0) 0%, #0f0b33 100%);

	@media (max-width: 1169px) {
		display: none;
	}
`;

const ImageContainer = styled.div`
	min-height: 100%;
	min-width: 100%;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	background-color: white;
	overflow: hidden;
`;

const FeatureSection = styled.div`
	max-width: 73.125rem;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	column-gap: 3.125rem;

	div {
		max-width: 31.938rem;
	}

	p {
		display: flex;
		margin: 1rem 0;
		line-height: var(--line-height);
		color: #878599;
		font-size: 1rem;
	}
`;

const RelatedWork = styled.div`
	margin: 0 auto;
	margin-top: 5rem;
	max-width: 73.125rem;

	h2 {
		text-align: center;
		margin-bottom: 2rem;
		font-size: 1.3rem;
		color: var(--color-secondary-second);

		@media (max-width: 768px) {
			text-align: left;
		}
	}

	h2:last-of-type {
		color: var(--color-primary);
		font-style: normal;
		text-align: center;
		font-weight: bold;
		font-size: 52px;
		line-height: 150%;
		@media (max-width: 768px) {
			font-size: 1.4rem;
			text-align: left;
		}
	}
`;

const CustomButton = styled.button`
	display: block;
	min-width: 164px;
	height: 54px;
	font: inherit;
	cursor: pointer;
	font-weight: bold;
	background-color: var(--color-secondary);
	border: 1px solid var(--color-secondary);
	padding: 0.5rem 1rem;
	border-radius: 4px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	transition-duration: var(--transition-duration);
	color: white;
	margin-top: 3rem;
	@media (max-width: 568px) {
		margin-top: 2rem;
		width: 80%;
	}
	&:hover {
		background: rgba(0, 208, 176, 0.7);
		border-color: rgba(0, 208, 176, 0.7);
	}
	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background-color: #1d1852 !important;
		border-color: #1d1852 !important;
	}
`;

const LivePreviewLink = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 164px;
	height: 54px;
	font: inherit;
	cursor: pointer;
	font-weight: bold;
	background-color: #0f0b33;
	border: 1px solid #0f0b33;
	padding: 0 1rem;
	border-radius: 4px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	transition-duration: var(--transition-duration);
	color: white;
	margin-top: 3rem;
	text-decoration: none;
	@media (max-width: 568px) {
		margin-top: 2rem;
		width: 80%;
	}
	&:hover {
		background: #1d1852;
		border-color: #1d1852;
		color: white;
	}
`;

const GridWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 4rem;
`;

const GridContainer = styled.div`
	width: 100%;
	max-width: var(--max-width1250);
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 2rem;

	@media (max-width: 992px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (max-width: 680px) {
		grid-template-columns: 1fr;
	}
`;
