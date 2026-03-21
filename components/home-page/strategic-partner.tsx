/** @format */

import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import ChatIcon from "@material-ui/icons/Chat";
import styled from "styled-components";
import React, { FC } from "react";

import { strategicPartner } from "../../app/company-data";

const StrategicPartner: FC = () => {
	return (
		<Section>
			<CustomContainer>
				<Inner>
					<IconBadge aria-hidden>
						<ChatIcon style={{ fontSize: "1.75rem" }} />
					</IconBadge>
					<h2>STRATEGIC PARTNER</h2>
					<PartnerName>{strategicPartner.name}</PartnerName>
					<Tagline>{strategicPartner.tagline}</Tagline>
					<Intro>{strategicPartner.intro}</Intro>
					<BulletList>
						{strategicPartner.bullets.map((line) => (
							<li key={line}>{line}</li>
						))}
					</BulletList>
					<CtaAnchor
						href={strategicPartner.url}
						target='_blank'
						rel='noopener noreferrer'
						aria-label={`${strategicPartner.ctaLabel} (opens in a new tab)`}>
						{strategicPartner.ctaLabel}
						<OpenInNewIcon style={{ fontSize: "1.1rem" }} aria-hidden />
					</CtaAnchor>
				</Inner>
			</CustomContainer>
		</Section>
	);
};

export default StrategicPartner;

const Section = styled.section`
	background: var(--color-primary);
	padding: 3.5rem 9%;
	color: #0f0b33;

	@media (min-width: 768px) {
		padding: 4.5rem 9%;
	}
`;

const CustomContainer = styled.div`
	width: 100%;
	max-width: var(--max-width);
	margin: 0 auto;
`;

const Inner = styled.div`
	max-width: 48rem;
	margin: 0 auto;
	text-align: center;

	h2 {
		margin-bottom: 0.75rem;
		color: var(--color-secondary-second);
		font-size: 1rem;
		letter-spacing: 0.04em;
	}

	@media (min-width: 768px) {
		h2 {
			font-size: 1.05rem;
		}
	}
`;

const IconBadge = styled.div`
	width: 3.5rem;
	height: 3.5rem;
	margin: 0 auto 1.25rem;
	border-radius: 12px;
	background: linear-gradient(
		135deg,
		var(--color-secondary) 0%,
		rgba(0, 208, 176, 0.85) 100%
	);
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4px 14px rgba(15, 11, 51, 0.12);
`;

const PartnerName = styled.h3`
	font-size: 1.75rem;
	line-height: 1.2;
	margin-bottom: 0.5rem;
	color: #0f0b33;

	@media (min-width: 768px) {
		font-size: 2.25rem;
	}
`;

const Tagline = styled.p`
	font-size: 1.05rem;
	color: #3d3a5c;
	margin-bottom: 1.5rem;
	line-height: var(--line-height);
	font-weight: 500;
`;

const Intro = styled.p`
	text-align: left;
	line-height: var(--line-height);
	color: #0f0b33;
	margin-bottom: 1.25rem;

	@media (min-width: 768px) {
		text-align: center;
		max-width: 42rem;
		margin-left: auto;
		margin-right: auto;
	}
`;

const BulletList = styled.ul`
	text-align: left;
	margin: 0 auto 2rem;
	padding-left: 1.25rem;
	max-width: 40rem;
	line-height: 1.65;
	color: #0f0b33;

	li {
		margin-bottom: 0.65rem;
	}

	li::marker {
		color: var(--color-secondary);
	}
`;

const CtaAnchor = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	min-width: 200px;
	min-height: 52px;
	padding: 0.65rem 1.5rem;
	border-radius: 4px;
	background: #0f0b33;
	color: white !important;
	font-weight: 600;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	transition: background var(--transition-duration),
		transform var(--transition-duration);

	&:hover {
		background: #1d1852;
		transform: translateY(-1px);
	}

	&:focus-visible {
		outline: 2px solid var(--color-secondary-second);
		outline-offset: 3px;
	}
`;
