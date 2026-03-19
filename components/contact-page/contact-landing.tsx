/** @format */

import styled from "styled-components";
import { FC, memo, useEffect } from "react";
import { companyInfo } from "../../app/company-data";

const ContactLanding: FC = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Wrapper>
			<TopWrapper>
				<CustomContainer>
					<Container>
						<h2>CONTACT US</h2>
						<p>Let&apos;s build your next platform with {companyInfo.name}</p>
					</Container>
				</CustomContainer>
			</TopWrapper>
		</Wrapper>
	);
};

export default memo(ContactLanding);

const Wrapper = styled.div`
	width: 100vw;
	position: relative;
`;

const CustomContainer = styled.div`
	width: 100%;
	max-width: var(--max-width);
	overflow: hidden;
	margin: 0 auto;
	width: 100vw;
	display: grid;

	@media (min-width: 768px) {
		place-items: center;
	}
`;

const TopWrapper = styled.div`
	position: relative;
	@media (max-width: 768px) {
	}

	background: var(--color-primary);
	background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='30' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='30' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='50' cy='30' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='30' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/svg%3E"),
		linear-gradient(
			to right,
			rgba(0, 208, 176, 0.08),
			rgba(15, 11, 51, 0.04),
			#ffffff
		);

	padding: 5rem 9%;
	padding-top: 12rem !important;

	color: #0f0b33;
	@media (min-width: 768px) {
		min-height: 80vh;
		padding: 8rem 0 !important;
		padding-top: 15rem !important;
		padding-bottom: 0 !important;
	}

	@media (min-width: 1169px) {
		padding-bottom: 20rem !important;
	}
`;

const Container = styled.div`
	h2 {
		margin-bottom: 2rem;
		color: var(--color-secondary-second);
	}
	p {
		font-size: 1.1rem;
		margin-bottom: 2rem;
		line-height: 1.4;
		@media (min-width: 768px) {
			font-size: 3.25rem;
			font-weight: 700;
			max-width: 478px;
		}
	}
`;
