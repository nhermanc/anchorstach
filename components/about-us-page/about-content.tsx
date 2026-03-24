/** @format */

import styled from "styled-components";
import Image from "next/image";
import { FC, memo, useRef, useEffect } from "react";

import { strategicPartner } from "../../app/company-data";

const AboutContent: FC = () => {
	const autoScrollToBottomRef = useRef<HTMLDivElement>(null);

	// Auto Scroll functionality
	useEffect(() => {
		window.scrollTo({
			// top:0
			behavior: "smooth",
		});
		// Auto Scroll functionality
		autoScrollToBottomRef?.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, []);

	return (
		<Wrapper>
			{/* Empty div for auto scroll */}
			<div
				ref={autoScrollToBottomRef}
				style={{ paddingTop: "7rem", position: "absolute", top: "-100px" }}
				className='auto-scroll'></div>
			<Container>
				<RightContainer>
					<h2>
						<span>About</span> Software Agency
					</h2>
				</RightContainer>
				<LeftContainer>
					<p>
						We are a software and engineering team based in{" "}
						<strong>Chicago, IL</strong>, working with clients across the U.S.
						and worldwide. We build web and mobile applications, AI integrations,
						business systems, and custom platforms that are reliable, accessible,
						and ready to scale.
					</p>
				</LeftContainer>
			</Container>

			<PartnerBanner>
				<p>
					<strong>Strategic partner:</strong> AnchorStackTech works with{" "}
					<a
						href={strategicPartner.url}
						target='_blank'
						rel='noopener noreferrer'>
						{strategicPartner.name}
					</a>{" "}
					— {strategicPartner.tagline.toLowerCase()}. When your roadmap
					includes AI that answers buyers, captures leads, and supports sales
					on the web and social, we are happy to point you to their platform
					while we handle custom builds and integrations for your stack.
				</p>
			</PartnerBanner>

			<ImageWrapper
				style={{
					position: "relative",
					cursor: "pointer",
				}}>
				<ImageContainer
					style={{
						position: "relative",
						cursor: "pointer",
					}}>
					<Image
						src='/about-us/about2.webp'
						alt='about-us Image'
						layout='fill'
						objectFit='cover'
					/>
				</ImageContainer>
			</ImageWrapper>
		</Wrapper>
	);
};

export default memo(AboutContent);

const Wrapper = styled.div`
	min-height: 100vh;
	padding: 6rem 9%;
	padding-top: 13rem !important;
	background: #e5e5e5;
	width: 100vw;
	position: relative;
	@media (min-width: 768px) {
		padding: 8rem 9%;
	}

	@media (min-width: 1169px) {
		padding-bottom: 500px !important;
	}

	position: relative;
`;

const Container = styled.div`
	width: 100%;
	max-width: var(--max-width1250);
	overflow: hidden;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;

	@media (max-width: 968px) {
		flex-wrap: wrap;
	}
`;

const RightContainer = styled.div`
	margin-bottom: 1.3rem;
	font-size: 24px;

	span {
		color: var(--color-secondary);
	}

	@media (min-width: 768px) {
		margin-right: 1rem;
		max-width: 700px;
		font-weight: bold;
		font-size: 53px;
		font-style: normal;
		line-height: 150%;
	}
`;

const LeftContainer = styled.div`
	line-height: var(--line-height);
	max-width: 585px;
	color: #6f6d85;

	@media (min-width: 968px) {
		font-size: 1.1rem;
		margin-top: -2rem;
	}
`;

const PartnerBanner = styled.div`
	max-width: var(--max-width1250);
	margin: 2rem auto 0;
	padding: 1.25rem 1.5rem;
	border-radius: 8px;
	border-left: 4px solid var(--color-secondary);
	background: rgba(255, 255, 255, 0.85);
	box-shadow: 0 2px 12px rgba(15, 11, 51, 0.06);
	line-height: var(--line-height);
	color: #0f0b33;

	p {
		margin: 0;
		font-size: 0.98rem;
	}

	a {
		color: var(--color-secondary);
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	a:hover {
		color: #00b89a;
	}

	@media (min-width: 968px) {
		margin-top: 2.5rem;
		font-size: 1.05rem;

		p {
			font-size: inherit;
		}
	}
`;

const ImageContainer = styled.div`
	min-height: 100%;
	min-width: 100%;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	background-color: white;
	overflow: hidden;
`;

const ImageWrapper = styled.div`
	max-width: 1170px;
	width: 100%;
	height: 21.875rem;
	max-height: 21.875rem;
	margin: 0rem auto;
	margin-top: 2.5rem;
	overflow: hidden;
	@media (min-width: 968px) {
		display: none;
	}
`;
