/** @format */

import Link from "next/link";
import styled from "styled-components";
import WebIcon from "@material-ui/icons/Web";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import MemoryIcon from "@material-ui/icons/Memory";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import React, { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import { serviceItems } from "../../app/company-data";

type ServiceVisual = {
	icon: ReactNode;
	backgroundImage: string;
};

const serviceVisuals: Record<string, ServiceVisual> = {
	"web-solutions": {
		icon: <WebIcon style={{ color: "white", fontSize: "1.7rem" }} />,
		backgroundImage: "/services/web-solutions.jpg",
	},
	"mobile-app-solutions": {
		icon: <PhoneIphoneIcon style={{ color: "white", fontSize: "1.7rem" }} />,
		backgroundImage: "/services/mobile-app-solutions.jpg",
	},
	"erp-business-systems": {
		icon: (
			<SettingsApplicationsIcon style={{ color: "white", fontSize: "1.7rem" }} />
		),
		backgroundImage: "/services/erp-business-systems.jpg",
	},
	"blockchain-solutions": {
		icon: (
			<AccountBalanceWalletIcon style={{ color: "white", fontSize: "1.7rem" }} />
		),
		backgroundImage: "/services/blockchain-solutions.jpg",
	},
	"ai-solutions": {
		icon: <MemoryIcon style={{ color: "white", fontSize: "1.7rem" }} />,
		backgroundImage: "/services/ai-solutions.jpg",
	},
	"desktop-software": {
		icon: <DesktopWindowsIcon style={{ color: "white", fontSize: "1.7rem" }} />,
		backgroundImage: "/services/desktop-software.jpg",
	},
};

const defaultServiceVisual: ServiceVisual = {
	icon: <WebIcon style={{ color: "white", fontSize: "1.7rem" }} />,
	backgroundImage: "/home/home1.webp",
};

const Services: FC = () => {
	const router = useRouter();

	return (
		<ServicesWrapper>
			<CustomContainer>
				<ServicesTop>
					<h2>SERVICES</h2>
					<div className='content-container'>
						<h2 className="section-heading">Software services designed for business growth</h2>

						<p>
						From strategy and design to development and support, we build reliable digital solutions that help businesses launch faster, operate smarter, and scale with confidence.
						</p>
					</div>
				</ServicesTop>

				<ServicesGrid>
					{serviceItems.map((service) => {
						const visual =
							serviceVisuals[service.slug] || defaultServiceVisual;
						return (
						<GidItem
							key={service.slug}
							bgSrc={visual.backgroundImage}
							onClick={() => {
								router.push({
									pathname: "/service-detail",
									query: { category: service.slug },
								});
							}}>
							<div className='icon'>{visual.icon}</div>
							<h3>{service.title}</h3>
							<p>{service.description}</p>
						</GidItem>
						);
					})}
				</ServicesGrid>

				<ServicesFooterCta>
					<p>
						See full service areas, deliverables, and how we scope projects on the
						dedicated services page.
					</p>
					<Link href="/services" prefetch passHref>
						<ServicesCtaLink>View all services</ServicesCtaLink>
					</Link>
				</ServicesFooterCta>
			</CustomContainer>
		</ServicesWrapper>
	);
};

export default Services;

const CustomContainer = styled.div`
	width: 100%;
	max-width: var(--max-width);
	overflow: hidden;
	margin: 0 auto;
	position: relative;
`;

const ServicesWrapper = styled.section`
	position: relative;
	padding-top: 1rem;
	min-height: auto;
	padding: 3.5rem 9% !important;
	background: white;
	@media (min-width: 768px) {
		padding: 4.5rem 9% !important;
	}

	background: white;
	color: #0f0b33;
`;

const ServicesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 1.5rem;

	@media (max-width: 992px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	@media (max-width: 640px) {
		grid-template-columns: 1fr;
	}
`;

const GidItem = styled.div<{ bgSrc: string }>`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	border: 1px solid rgba(255, 255, 255, 0.12);
	min-height: 22rem;
	overflow: hidden;
	padding: 1.25rem;
	border-bottom: 4px solid var(--color-secondary);
	transition: var(--transition-duration);
	cursor: pointer;
	color: #ffffff;
	background-image: url(${(props) => props.bgSrc});
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	box-shadow: 0 10px 30px rgba(15, 11, 51, 0.2);

	/* Alpha overlay layer for better text readability */
	&::before {
		content: "";
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(10, 9, 35, 0.62) 0%,
			rgba(10, 9, 35, 0.8) 55%,
			rgba(10, 9, 35, 0.92) 100%
		);
		pointer-events: none;
	}

	> * {
		position: relative;
		z-index: 1;
	}

	&:hover {
		border: 1px solid rgba(0, 208, 176, 0.7);
		transform: translate3d(0, -5px, 0);
		-webkit-transform: translate3d(0, -5px, 0);
		-moz-transform: translate3d(0, -5px, 0);
		-ms-transform: translate3d(0, -5px, 0);
		-o-transform: translate3d(0, -5px, 0);
	}
	.icon {
		margin-bottom: 1.25rem;
		width: 72px;
		height: 72px;
		border-radius: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(15, 11, 51, 0.72);
		border: 1px solid rgba(255, 255, 255, 0.18);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
	}
	.icon svg {
		filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
	}
	h3 {
		font-size: 1.1rem;
		font-weight: bold;
		margin: 0 0 0.85rem;
		color: #ffffff;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
	}
	p {
		color: rgba(255, 255, 255, 0.92);
		line-height: var(--line-height);
		font-size: 1rem;
		margin: 0 0 1rem 0;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.32);
	}

	button {
		margin-top: auto;
		height: 42px;
		padding: 0.35rem 0.9rem;
		border: 1px solid var(--color-secondary);
		background: var(--color-secondary);
		color: white;
		font-weight: 700;
		border-radius: 4px;
		cursor: pointer;
	}
`;

const ServicesFooterCta = styled.div`
	margin-top: 2.5rem;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 1.25rem;
	padding-top: 1.5rem;
	border-top: 1px solid #e2e8f0;

	p {
		margin: 0;
		max-width: 36rem;
		line-height: 1.65;
		color: #3d3a54;
		font-size: 1.05rem;
	}
`;

const ServicesCtaLink = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-height: 48px;
	padding: 0.55rem 1.5rem;
	border-radius: 6px;
	background: var(--color-secondary, #00d0b0);
	color: #fff;
	font-weight: 700;
	font-size: 1rem;
	text-decoration: none;
	border: 1px solid var(--color-secondary, #00d0b0);
	transition: filter 0.2s ease, transform 0.15s ease;
	white-space: nowrap;
	&:hover {
		filter: brightness(1.05);
		transform: translateY(-1px);
	}
`;

const ServicesTop = styled.div`
	margin-bottom: 40px;
	h2 {
		margin-bottom: 2rem;
		color: var(--color-secondary-second);
	}
	.section-heading {
		font-style: normal;
		font-weight: bold;
		font-size: 32px;
		line-height: 150%;
		max-width: 504px;
		color: #0f0b33;

		@media (max-width: 568px) {
			font-size: 1.4rem;
			margin-bottom: 1rem;
		}
		@media (min-width: 991px) {
			font-size: 2rem;
		}
	}
	.content-container {
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
