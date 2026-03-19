/** @format */

import styled from "styled-components";
import React, { memo, useEffect } from "react";

const Welcoming: React.FC = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Wrapper style={{ position: "relative" }}>
			<CustomContainer>
				<Container>
					<h1>BLOG</h1>
					<h2>Collection of articles from our team</h2>
				</Container>
			</CustomContainer>
		</Wrapper>
	);
};

export default memo(Welcoming);

const CustomContainer = styled.div`
	width: 100%;
	max-width: var(--max-width);
	overflow: hidden;
	margin: 0 auto;
`;

const Wrapper = styled.div`
	width: 100vw;
	min-height: 52vh;
	padding: 5rem 9%;
	padding-top: 12rem;
	padding-bottom: 2.2rem;
	color: #0f0b33;
	display: grid;
	place-items: center;
	position: relative;
	background-image: linear-gradient(
		to bottom,
		rgba(255, 255, 255, 0.94),
		rgba(255, 255, 255, 0.94)
	),
	url("/blog/blog.jpg");
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;

	@media (min-width: 1500px) {
		padding-bottom: 6rem;
	}
`;

const Container = styled.div`
	max-width: 35.563rem;
	text-align: center;

	h1 {
		@media (max-width: 568px) {
			font-size: 24px;
		}

		margin-bottom: 2rem;
		color: var(--color-secondary-second);
	}

	h2 {
		font-size: 1.1rem;
		margin-bottom: 2rem;
		line-height: 1.4;
		max-width: 35.563rem;
		font-weight: 700;
		color: #0f0b33;

		@media (min-width: 568px) {
			font-size: 2.7rem;
			font-weight: 700;
		}
	}
`;
