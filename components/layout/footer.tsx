/** @format */

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import React, { memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import ForumIcon from "@material-ui/icons/Forum";

import { companyInfo, serviceItems, socialLinks } from "../../app/company-data";

interface AdminProps {
	isAdminPage: boolean;
}

const Footer: React.FC = () => {
	const [isAdminPage, SetIsAdminPage] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		if (router.pathname == "/admin") {
			SetIsAdminPage(true);
		}
	}, [router.pathname]);

	return (
		<FooterWrapper isAdminPage={isAdminPage}>
			<CustomContainer>
				<FooterTop>
					<LogoBlock>
						<Link href='/'>
							<a>
								<LogoImage>
									<div className='logo'>
										<Image
											className='logo-img'
											src={companyInfo.logoPath}
											alt={`${companyInfo.name} logo`}
											layout='fill'
											objectFit='contain'
										/>
									</div>
									<div>{companyInfo.name}</div>
								</LogoImage>
							</a>
						</Link>
						<p>{companyInfo.tagline}</p>
					</LogoBlock>

					<Column>
						<h3 className='head'>Categories</h3>
						{serviceItems.map((service) => (
							<li key={service.title}>
								<Link
									href={{
										pathname: "/service-detail",
										query: { category: service.slug },
									}}>
									<a>{service.title}</a>
								</Link>
							</li>
						))}
					</Column>

					<Column>
						<h3 className='head'>Quick Links</h3>
						<li>
							<Link href='/'>
								<a>Home</a>
							</Link>
						</li>
						<li>
							<Link href='/work'>
								<a>Work</a>
							</Link>
						</li>
						<li>
							<Link href='/services'>
								<a>Services</a>
							</Link>
						</li>
						<li>
							<Link href='/contact'>
								<a>Contact Us</a>
							</Link>
						</li>
					</Column>

					<Column>
						<h3 className='head'>Contact</h3>
						<ContactItem>
							<EmailIcon />
							<a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
						</ContactItem>
						<ContactItem>
							<CallIcon />
							<a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
						</ContactItem>
						<ContactItem>
							<HomeIcon />
							<span>{companyInfo.address}</span>
						</ContactItem>
						<ContactItem>
							<LanguageIcon />
							<a
								href={companyInfo.siteUrl}
								target='_blank'
								rel='noreferrer'>
								{new URL(companyInfo.siteUrl).hostname}
							</a>
						</ContactItem>
						<SocialRow>
							{socialLinks.map((social) => {
								const lowerLabel = social.label.toLowerCase();
								let icon = <ForumIcon />;
								if (lowerLabel.includes("linkedin")) icon = <LinkedInIcon />;
								if (lowerLabel.includes("facebook")) icon = <FacebookIcon />;
								if (lowerLabel.includes("twitter")) icon = <TwitterIcon />;
								if (lowerLabel.includes("discord")) icon = <ForumIcon />;
								if (lowerLabel.includes("instagram")) icon = <InstagramIcon />;
								if (lowerLabel.includes("tiktok")) icon = <MusicNoteIcon />;
								return (
									<a
										key={social.label}
										href={social.url}
										target='_blank'
										rel='noreferrer'
										aria-label={social.label}>
										{icon}
									</a>
								);
							})}
						</SocialRow>
					</Column>
				</FooterTop>
				<FooterBottom>
					&copy; {new Date().getFullYear()} {companyInfo.name}. All rights
					reserved.
				</FooterBottom>
			</CustomContainer>
		</FooterWrapper>
	);
};

export default memo(Footer);

const FooterWrapper = styled.div<AdminProps>`
	position: relative;
	min-height: 38.5625rem;
	width: 100vw;
	color: #0f0b33;
	padding: 5rem 9%;
	background: #ffffff;
	overflow: hidden;

	display: ${(props: any) => (props.isAdminPage ? `none` : `block`)};

	@media (min-width: 768px) {
		padding: 8rem 9% !important;
	}
`;

const CustomContainer = styled.footer`
	width: 100%;
	max-width: var(--max-width);
	margin: 0 auto;

	.head {
		font-weight: bold;
		font-size: 1.4rem;
		margin-bottom: 1rem;
		@media (max-width: 768px) {
			font-size: 1.3rem;
		}
	}
`;

const LogoImage = styled.div`
	color: #0f0b33;
	display: flex;
	align-items: center;
	text-transform: uppercase;
	margin-bottom: 0.75rem;

	.logo {
		width: 80px;
		height: 56px;
		display: flex;
		align-items: center;
		position: relative;
		img {
			display: block;
		}
	}

	div:last-child {
		margin-left: 0.5rem;
	}
`;

const FooterTop = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	gap: 2rem;
	margin-bottom: 3rem;
`;

const FooterBottom = styled.div`
	position: relative;
	z-index: 300;
	opacity: 0.99;
`;

const LogoBlock = styled.div`
	p {
		max-width: 16rem;
		line-height: 1.6;
	}
`;

const Column = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;

	li {
		margin-top: 0.75rem;
		line-height: 1.5;
	}

	a {
		color: #0f0b33;
	}
`;

const SocialRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-top: 1rem;

	a {
		width: 36px;
		height: 36px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: #eef2f7;
		color: #0f0b33;
		transition: var(--transition-duration);
	}

	a:hover {
		background: var(--color-secondary);
		color: white;
	}
`;

const ContactItem = styled.li`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	span,
	a {
		font-size: 0.95rem;
	}
`;
