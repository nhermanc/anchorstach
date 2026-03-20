/** @format */
import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import StarIcon from "@material-ui/icons/Star";
import Link from "next/link";
import React, { FC, useState } from "react";
import { companyInfo, testimonialItems } from "../../app/company-data";
import type { TestimonialItem } from "../../app/company-data";

const TESTIMONIAL: FC = () => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	/* Static / IONOS: no `/api/upwork-testimonials` — use bundled data only (no 404 in console). */
	const displayItems: TestimonialItem[] = testimonialItems;
	const safeIndex = displayItems.length > 0 ? currentIndex % displayItems.length : 0;
	const currentTestimonial = displayItems[safeIndex] ?? displayItems[0];

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev + 1) % displayItems.length);
	};

	const prevSlide = () => {
		setCurrentIndex((prev) =>
			prev === 0 ? displayItems.length - 1 : prev - 1,
		);
	};

	return (
		<Wrapper>
			<CustomContainer>
				<TopContainer>
					<div
						className='first-content'
						style={{
							backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.86)), url("${currentTestimonial.backgroundImage}")`,
						}}>
						<div className='inner-container'>
							<h2>TESTIMONIAL</h2>
							<p className='head-co'>What Our Customers Are Saying</p>
							<div className='testimonial'>
								<p>
									2K+ <span>Testimonial</span>
								</p>
							</div>
						</div>
					</div>

					<TestimonialContainer>
						<ArrowButton
							type='button'
							className='left'
							onClick={prevSlide}
							aria-label='Previous testimonial'>
							<ArrowBackIosIcon style={{ fontSize: "1.4rem" }} />
						</ArrowButton>
						<div className='second-content'>
							<h2>{currentTestimonial.serviceTitle}</h2>
							<RatingRow>
								{[1, 2, 3, 4, 5].map((star) => (
									<StarIcon
										key={`${currentTestimonial.id}-star-${star}`}
										style={{
											color:
												star <= currentTestimonial.rating
													? "#ff9700"
													: "#d5d8df",
											fontSize: "1.15rem",
										}}
									/>
								))}
							</RatingRow>
							<p className='p-s'>{currentTestimonial.review}</p>
							<div className='user'>
								<IconButton style={{ marginLeft: "-1rem" }}>
									<Avatar
										src={currentTestimonial.reviewerAvatar}
										style={{ width: "70px", height: "70px" }}
									/>
								</IconButton>
								<div>
									<p style={{ fontWeight: "bold", color: "#0f0b33" }}>
										{currentTestimonial.reviewerName}
									</p>
									<p style={{ color: "#878599" }}>
										{currentTestimonial.reviewerRole}
									</p>
								</div>
							</div>
						</div>
						<ArrowButton
							type='button'
							className='right'
							onClick={nextSlide}
							aria-label='Next testimonial'>
							<ArrowForwardIosIcon style={{ fontSize: "1.4rem" }} />
						</ArrowButton>
					</TestimonialContainer>
				</TopContainer>
				<BottomContainer>
					<WorkSection>
						<h2>WORK WITH US</h2>
						<div className='bottom-inner-container'>
							<h1>Have you decided to work on a project with us?</h1>

							<p>
								Interested in building your platform with {companyInfo.name}
								? Reach out and let us scope your requirements together.
							</p>
						</div>

						<Link href='/contact'>
							<a>
								<CustomButton>CONTACT US</CustomButton>
							</a>
						</Link>
					</WorkSection>
				</BottomContainer>
			</CustomContainer>
		</Wrapper>
	);
};

export default TESTIMONIAL;

const Wrapper = styled.div`
	background: #e5e5e5;
	padding: 3.5rem clamp(1rem, 4vw, 9%);
	color: #0f0b33;
	box-sizing: border-box;
	width: 100%;
	max-width: 100%;
	overflow-x: hidden;

	@media (min-width: 768px) {
		padding: 4.5rem clamp(1rem, 4vw, 9%);
		padding-bottom: 4.5rem;
	}

	@media (min-width: 1500px) {
		padding-bottom: 4.5rem;
	}
`;

const CustomContainer = styled.div`
	width: 100%;
	max-width: 78.125rem;
	overflow: hidden;
	margin: 0 auto;
	position: relative;
	padding: 0 clamp(0.25rem, 2vw, 0.5rem);
	box-sizing: border-box;
`;

const TopContainer = styled.div`
	margin-bottom: 2.5rem;
	gap: clamp(1.5rem, 4vw, 3.75rem);
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (min-width: 768px) {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: stretch;
	}

	.first-content {
		height: 220px;
		width: 100%;
		max-width: 700px;
		margin: 0 auto;
		background-position: center;
		background-size: cover;
		color: #0f0b33;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 2rem 1rem;
		overflow: hidden;
		box-sizing: border-box;

		@media (min-width: 768px) {
			height: auto;
			min-height: 320px;
			max-height: 575px;
			flex: 1 1 min(100%, 700px);
			max-width: min(100%, 700px);
			align-items: center;
			justify-content: flex-start;
			padding: clamp(2rem, 5vw, 5rem) clamp(1rem, 3vw, 1.5rem);
		}

		h2 {
			color: var(--color-secondary-second);
		}

		p.head-co {
			font-size: 1rem;
			font-weight: bold;
			font-size: 1.1rem;
			margin: 1.2rem 0;

			@media (min-width: 768px) {
				font-style: normal;
				font-weight: bold;
				font-size: clamp(1.5rem, 3.5vw + 0.5rem, 3.25rem);
				line-height: 150%;
				max-width: min(100%, 382px);
				margin: 2rem auto;
				margin-right: auto;
				text-align: center;
			}
		}

		.testimonial {
			padding-left: 1rem;
			border-left: 4px solid var(--color-secondary);
			p {
				span {
					font-size: 1rem;
				}
			}

			@media (min-width: 768px) {
				font-weight: bold;
			}
		}
	}

	.second-content {
		margin: 2rem 0;

		@media (min-width: 768px) {
			max-width: 400px;
		}

		h2 {
			color: #0f0b33;
			font-style: normal;
			font-weight: bold;
			font-size: 24px;
			line-height: 150%;
			margin: 1.2rem 0;
			margin-bottom: 2rem;
		}

		p {
			line-height: var(--line-height);
		}

		p.p-s {
			font-size: 1.1rem;
			color: #878599;
			min-height: 110px;
			@media (max-width: 568px) {
				min-width: 12.5rem;
				font-size: 1rem;
			}
		}

		.user {
			display: flex;
			align-items: center;
			margin-top: 1.2rem;

			p {
				margin-bottom: 0;
			}
		}
	}
`;

const TestimonialContainer = styled.div`
	position: relative;
	margin: 2rem 0;
	width: 100%;
	max-width: 520px;
	flex: 1 1 320px;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 280px;
	padding: 0 clamp(2.5rem, 8vw, 4rem);
	box-sizing: border-box;

	@media (min-width: 768px) {
		min-height: 320px;
		margin-left: auto;
		margin-right: auto;
	}
`;

const ArrowButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 44px;
	height: 44px;
	border-radius: 50%;
	border: none;
	background: #0f0b33;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	flex-shrink: 0;
	transition: background 0.2s ease, opacity 0.2s ease;
	z-index: 2;

	&.left {
		left: 0;
	}

	&.right {
		right: 0;
	}

	&:hover {
		background: #1d1852;
	}
`;

const RatingRow = styled.div`
	display: flex;
	align-items: center;
	gap: 0.2rem;
	margin-bottom: 0.75rem;
`;

const SlideIndicator = styled.p`
	font-size: 0.92rem;
	color: #878599;
	margin-top: 0.7rem;
`;

const BottomContainer = styled.div`
	width: 100%;
	max-width: 100%;
	box-sizing: border-box;
`;

const WorkSection = styled.div`
	margin-top: 2.5rem;
	h2 {
		margin-bottom: 2rem;
		color: var(--color-secondary-second);

		@media (max-width: 568px) {
			font-size: 1.4rem;
		}
	}

	h1 {
		max-width: 477px;
		color: #0f0b33;

		@media (max-width: 568px) {
			font-size: 1.4rem;
		}

		@media (min-width: 991px) {
			font-size: 2rem;
		}
	}

	.bottom-inner-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}
	p {
		line-height: var(--line-height);
		max-width: 36.5625rem;
		margin: 1rem 0 !important;
		font-size: 1.1rem;
		color: #0f0b33;
		@media (max-width: 568px) {
			min-width: 12.5rem;
			font-size: 1rem;
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
	background-color: #0f0b33;
	border: 1px solid #0f0b33;
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
		background: #1d1852;
		border-color: #1d1852;
	}
`;
