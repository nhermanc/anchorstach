/** @format */

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { FC } from "react";
import { useRouter } from "next/router";

import MainNavigation from "../layout/main-navigation";
import { howWeWorkSteps } from "../../app/how-we-work-data";

const HowWeWorkComponent: FC = () => {
	const router = useRouter();

	return (
		<>
			<MainNavigation />
			<Wrapper>
				<HeroSection>
					<h1>HOW WE WORK</h1>
					<p>
						Our proven software development process delivers quality products
						on time, from discovery to deployment.
					</p>
				</HeroSection>

				<StepsContainer>
					{howWeWorkSteps.map((step, index) => (
						<StepRow key={step.id}>
							<ContentColumn>
								<StepIndicator>
									<VerticalLine $isLast={index === howWeWorkSteps.length - 1} />
									<StepNumber>{step.stepNumber}.</StepNumber>
								</StepIndicator>
								<TextContent>
									<h2>{step.title}</h2>
									<p>{step.description}</p>
									<LearnMoreButton
										onClick={() =>
											step.learnMoreLink &&
											router.push(step.learnMoreLink)
										}>
										Learn more
										<ChevronRightIcon style={{ fontSize: "1.2rem" }} />
									</LearnMoreButton>
								</TextContent>
							</ContentColumn>
							<ImageColumn>
								<ImageWrapper>
									<Image
										src={step.image}
										alt={step.title}
										layout='fill'
										objectFit='cover'
									/>
								</ImageWrapper>
							</ImageColumn>
						</StepRow>
					))}
				</StepsContainer>

				<CTASection>
					<h2>Ready to start your project?</h2>
					<p>
						Let&apos;s discuss your requirements and build something great
						together.
					</p>
					<Link href='/contact' passHref>
						<CTAButtonLink>GET STARTED</CTAButtonLink>
					</Link>
				</CTASection>
			</Wrapper>
		</>
	);
};

export default HowWeWorkComponent;

const Wrapper = styled.main`
	background: #ffffff;
	min-height: 100vh;
	padding-top: 7rem;
	color: #0f0b33;
`;

const HeroSection = styled.section`
	padding: 4rem 9% 3rem;
	text-align: center;
	max-width: 48rem;
	margin: 0 auto;

	h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: var(--color-secondary-second);

		@media (min-width: 768px) {
			font-size: 3rem;
		}
	}

	p {
		font-size: 1.1rem;
		line-height: 1.7;
		color: #666;
	}
`;

const StepsContainer = styled.div`
	max-width: 87.5rem;
	margin: 0 auto;
	padding: 0 9% 4rem;
`;

const StepRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 4rem;
	align-items: center;
	margin-bottom: 5rem;

	@media (max-width: 992px) {
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-bottom: 4rem;
	}
`;

const StepIndicator = styled.div`
	position: relative;
	display: flex;
	align-items: flex-start;
`;

const VerticalLine = styled.div<{ $isLast: boolean }>`
	position: absolute;
	left: 1.25rem;
	top: 3.5rem;
	width: 2px;
	height: ${(p) => (p.$isLast ? "0" : "calc(100% + 4rem)")};
	background: repeating-linear-gradient(
		to bottom,
		#d5d8df 0,
		#d5d8df 6px,
		transparent 6px,
		transparent 12px
	);
`;

const StepNumber = styled.span`
	font-size: 4rem;
	font-weight: 700;
	line-height: 1;
	color: #0f0b33;
	font-family: "Poppins", sans-serif;
`;

const ContentColumn = styled.div`
	display: flex;
	gap: 2rem;
	align-items: flex-start;

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 1rem;
	}
`;

const TextContent = styled.div`
	flex: 1;

	h2 {
		font-size: 1.75rem;
		font-weight: 700;
		line-height: 1.3;
		margin-bottom: 1rem;
		color: #0f0b33;

		@media (min-width: 768px) {
			font-size: 2rem;
		}
	}

	p {
		font-size: 1rem;
		line-height: 1.7;
		color: #666;
		margin-bottom: 1.5rem;
	}
`;

const LearnMoreButton = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 0.35rem;
	font: inherit;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	background: #eef2f7;
	color: #0f0b33;
	border: none;
	padding: 0.6rem 1.25rem;
	border-radius: 50px;
	transition: all 0.2s ease;

	&:hover {
		background: #d5d8df;
	}
`;

const ImageColumn = styled.div`
	position: relative;
`;

const ImageWrapper = styled.div`
	position: relative;
	width: 100%;
	aspect-ratio: 4/3;
	border-radius: 24px;
	overflow: hidden;
	box-shadow: 0 4px 24px rgba(15, 11, 51, 0.08);

	@media (min-width: 768px) {
		border-radius: 32px;
		aspect-ratio: 16/10;
	}
`;

const CTASection = styled.section`
	text-align: center;
	padding: 4rem 9% 6rem;
	background: #f8fafc;

	h2 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
		color: #0f0b33;
	}

	p {
		font-size: 1.1rem;
		color: #666;
		margin-bottom: 2rem;
	}
`;

const CTAButtonLink = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 164px;
	height: 54px;
	font: inherit;
	font-weight: bold;
	background-color: #0f0b33;
	border: 1px solid #0f0b33;
	color: white;
	padding: 0.5rem 1.5rem;
	border-radius: 4px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	transition: all 0.2s ease;
	cursor: pointer;
	text-decoration: none;

	&:hover {
		background: #1d1852;
		border-color: #1d1852;
		color: white;
	}
`;
