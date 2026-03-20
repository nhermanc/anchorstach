/** @format */

import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import React, { FC } from "react";

const AboutUsCom: FC = () => {
	const router = useRouter();
	return (
		<AboutAsWrapper>

			<CustomContainer>
				<ContentContainer>
					<h2>ABOUT US</h2>
					<ContentTop>
						<div className='heading'>
							A trusted technology partner for modern businesses
						</div>
						<div className='job-success'>
							<p className='job-s'>500+</p>
							<p>Total Clients</p>
							<div className='absolute'></div>
						</div>
						<div className='job-success'>
							<p className='job-s'>2K+</p>
							<p>Delivered Projects</p>
							<div className='absolute'></div>
						</div>
						<div className='job-success'>
							<p className='job-s'>20+</p>
							<p>Ongoing Projects</p>
							<div className='absolute'></div>
						</div>
						<div className='job-success'>
							<p className='job-s'>$5M+</p>
							<p>Revenue Generated</p>
							<div className='absolute'></div>
						</div>
					</ContentTop>
					<ContentBottom>
						<div>
							<p>
							AnchorStackTech helps businesses design, build, and improve digital products that solve real operational challenges. <br />
							We focus on practical, scalable software across web, mobile, AI, blockchain, ERP, and desktop solutions.
							</p>
						</div>

						<div>
							<p>
								Our team combines technical expertise with a business-focused mindset to deliver reliable systems, efficient workflows, and user-friendly digital experiences. <br />
								From concept to deployment, we work closely with clients to create solutions that support growth, performance, and long-term value.
							</p>
						</div>
					</ContentBottom>

					<HiddenImageContainer>
						<Image
							src='/home/home2.webp'
							alt='About section'
							width={500}
							height={400}
							layout='responsive'
							loading='lazy'
						/>
					</HiddenImageContainer>

					<CustomButton
						onClick={() => {
							router.push("/about-us");
						}}>
						VIEW DETAIL
					</CustomButton>
				</ContentContainer>
			</CustomContainer>
		</AboutAsWrapper>
	);
};

export default AboutUsCom;

const AboutAsWrapper = styled.div`
	min-height: auto;
	background: #ffffff;

	padding: 3.5rem 9%;
	position: relative;

	@media (min-width: 768px) {
		padding: 4.5rem 9% !important;
	}

	color: #0f0b33;
`;

const CustomContainer = styled.div`
	width: 100%;
	max-width: var(--max-width);
	overflow: hidden;
	margin: 0 auto;
	position: relative;
`;

const ContentContainer = styled.div`
	h2 {
		margin-bottom: 2rem;
		color: var(--color-secondary-second);
	}

	p {
		line-height: var(--line-height);
	}
`;

const ContentTop = styled.div`
	@media (max-width: 768px) {
		display: none;
	}

	display: flex;
	align-items: center;
	justify-content: space-between;

	.heading {
		max-width: 500px;
		font-size: 1rem;
		font-weight: bold;
		font-size: 1.5rem;
		font-style: normal;
		font-weight: bold;

		@media (min-width: 768px) {
			font-size: 32px;
			line-height: 150%;
		}
	}

	.job-success {
		max-width: 500px;
		position: relative;

		.job-s {
			font-weight: bold;
			font-size: 24px;
		}

		.absolute {
			position: absolute;
			border-left: 2px solid var(--color-secondary);
			height: 30px;
			left: 0;
			top: 7px;
			height: 34px;
		}

		p {
			padding-left: 1rem;
		}
	}
`;

const ContentBottom = styled.div`
	margin: 2rem 0;

	p {
		margin-bottom: 1.3rem;
		color: #0f0b33;
	}

	@media (min-width: 768px) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 50px;

		p {
			max-width: 550px;
			padding-right: 1rem;
		}
	}
`;

const AbsoluteContainer = styled.div`
	width: 100vw;
	position: absolute;
	top: -360px;
	left: 0;
	right: 0;
	padding: 0 9%;

	.content-container {
		max-width: 1170px;
		height: 720px;
		width: 100%;
		margin: 0 auto;
	}

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

const CustomButton = styled.button`
	min-width: 153px;
	height: 52px;
	font: inherit;
	cursor: pointer;
	background-color: #0f0b33;
	background-color: #0f0b33;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	transition-duration: var(--transition-duration);
	text-align: center;
	color: white;
	margin-top: 3rem;
	display: block;
	&:hover {
		background: #1d1852;
		border-color: #1d1852;
	}
	@media (max-width: 768px) {
		width: 80%;
	}
`;

const HiddenImageContainer = styled.div`
	width: 100%;
	max-height: 20rem;
	overflow: hidden;
	margin-top: 4rem;
	@media (min-width: 768px) {
		display: none;
	}

	img {
		object-fit: cover;
		display: block;
	}
`;
