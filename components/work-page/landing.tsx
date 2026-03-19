/** @format */

import styled from "styled-components";
import { memo, useEffect } from "react";

const Landing = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Wrapper style={{ position: "relative" }}>
			<CustomContainer>
				<h1>OUR WORK</h1>
					<p>Selected delivery from real business projects</p>
			</CustomContainer>
		</Wrapper>
	);
};

export default memo(Landing);

const CustomContainer = styled.div`
	width: 100%;
	max-width: var(--max-width);
	overflow: hidden;
	display: none;

	@media (min-width: 768px) {
		margin: 0 auto;
		display: grid;
		place-items: center;
		text-align: center;
	}

	h1 {
		margin-bottom: 1rem;
		color: var(--color-secondary-second);
		font-style: normal;
		font-weight: bold;
		font-size: 28px;
		line-height: 150%;
	}
	p {
		font-size: 1rem;
		margin-bottom: 1rem;
		line-height: 1.4;
		@media (min-width: 768px) {
			font-size: 2rem;
			max-width: 600px;
			line-height: 150%;
			font-style: normal;
			font-weight: bold;
		}
	}
`;

const Wrapper = styled.div`
	background: var(--color-primary);
	background-image: linear-gradient(
		to right,
		rgba(0, 208, 176, 0.08),
		rgba(15, 11, 51, 0.04),
		#ffffff
	);

	padding: 4rem 9%;
	color: #0f0b33;
	position: relative;
	width: 100vw;

	@media (min-width: 768px) {
		padding: 5rem 9%;
		padding: 5rem 9%;
		padding-top: 12rem;
		display: grid;
		place-items: center;
		text-align: center;
	}

	@media (min-width: 1169px) {
		display: grid;
		padding-bottom: 400px !important;
	}
`;
