/** @format */

import styled from "styled-components";
import Image from "next/image";
import EmailIcon from "@material-ui/icons/Email";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { FC, memo } from "react";
import { teamMembers } from "../../app/company-data";

const Team: FC = () => {
	return (
		<Wrapper>
			<AbsoluteContainer>
				<CustomContainer>
					<div className='content-container'>
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
					</div>
				</CustomContainer>
			</AbsoluteContainer>

			<CustomContainer>
				<TopContainer>
					<h2>Here We Are</h2>
					<InnerContainer>
						<RightContainer>
							<p>
<<<<<<< HEAD
								We are a remote design studio situated in Chicago that
								works with clients worldwide. As enthusiastic designers,
								we take pride in creating things that are simple to use,
								accessible, engaging, and delicious. Every morning, we
								get out of bed by making people smile. Through
								deliberate design,
=======
								AnchorStackTech is rooted in <strong>Chicago, IL</strong>, with
								a distributed team that partners with organizations around
								the world. We care about clear communication, disciplined
								delivery, and technology that supports measurable business
								outcomes—not buzzwords.
>>>>>>> 14b3240634bdc2e281e41970b17db844714a2dd2
							</p>
						</RightContainer>
						<LeftContainer>
							<p>
								We build digital products that are straightforward to use
								and maintain—from internal tools to customer-facing apps—with
								the polish people expect from modern software.
							</p>
							<p>
								Whether you are a growing startup or an established team, we
								work with you through discovery, implementation, and launch so
								your roadmap stays aligned with your goals.
							</p>
						</LeftContainer>
					</InnerContainer>
				</TopContainer>
				<BottomContainer>
					<div className='grid'>
						<h3>500+</h3>
						<p>Total Clients</p>
					</div>
					<div className='grid'>
						<h3>20+</h3>
						<p>Ongoing Project</p>
					</div>
					<div className='grid'>
						<h3>4</h3>
						<p>Countries</p>
					</div>
					<div className='grid'>
						<h3>2K+</h3>
						<p>Good Reviews</p>
					</div>
				</BottomContainer>

				{/* <MemberSection>
					<h3>Team Members</h3>
					<MemberGrid>
						{teamMembers.map((member) => (
							<MemberCard key={member.name}>
								<MemberPhoto>
									<Image
										src={member.image}
										alt={member.name}
										width={180}
										height={180}
										layout='responsive'
									/>
								</MemberPhoto>
								<h4>{member.name}</h4>
								<p className='role'>{member.role}</p>
								<ContactRow>
									<a
										href={member.whatsapp}
										target='_blank'
										rel='noreferrer'>
										<WhatsAppIcon />
									</a>
									<a
										href={member.linkedin}
										target='_blank'
										rel='noreferrer'>
										<LinkedInIcon />
									</a>
									<a href={`mailto:${member.email}`}>
										<EmailIcon />
									</a>
								</ContactRow>
							</MemberCard>
						))}
					</MemberGrid>
				</MemberSection> */}
			</CustomContainer>
		</Wrapper>
	);
};

export default memo(Team);

const CustomContainer = styled.div`
	width: 100%;
	max-width: var(--max-width);
	overflow: hidden;
	margin: 0 auto;
	position: relative;
`;

const Wrapper = styled.div`
	min-height: 100vh;
	background: #f8fafc;
	padding: 5rem 9%;
	position: relative;
	color: #0f0b33;

	@media (min-width: 768px) {
		padding: 8rem 9% !important;
	}

	@media (min-width: 1169px) {
		padding-top: 500px !important;
		padding-bottom: 280px !important;
	}

	@media (min-width: 991px) {
		padding-bottom: 280px !important;
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
	width: 100%;
	max-width: 1170px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	background-color: white;
	overflow: hidden;
	margin: 0 auto;
`;

const TopContainer = styled.div`
	max-width: var(--max-width1250);
	margin: 0 auto;

	p {
		line-height: var(--line-height);
		margin-bottom: 1.3rem;

		@media (min-width: 968px) {
			font-size: 1.1rem;
		}
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1.3rem;
	}
`;

const InnerContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;

	p {
		color: #6f6d85;
	}
`;

const RightContainer = styled.div`
	@media (min-width: 768px) {
		width: 550px;
		max-width: 571px;
		margin-right: 1rem;
	}
`;

const LeftContainer = styled.div`
	max-width: 500px;
`;

const BottomContainer = styled.div`
	max-width: var(--max-width1250);
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-top: 1rem;

	.grid {
		margin-bottom: 2rem;
		min-width: 150px;
	}

	h3 {
		color: var(--color-secondary-second);
		margin-bottom: 1rem;
		font-style: normal;
		font-weight: bold;
		font-size: 24px;
		line-height: 150%;
	}
`;

const MemberSection = styled.section`
	margin-top: 2rem;

	h3 {
		font-size: 1.6rem;
		color: var(--color-primary);
		margin-bottom: 1rem;
	}
`;

const MemberGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	gap: 1rem;
`;

const MemberCard = styled.article`
	background: white;
	border: 1px solid #e4e7ee;
	border-radius: 10px;
	box-shadow: 0 2px 10px rgba(15, 11, 51, 0.08);
	padding: 1rem;

	h4 {
		margin: 0.85rem 0 0.4rem;
		color: #0f0b33;
	}

	p.role {
		margin: 0;
		color: #6f6d85;
	}
`;

const MemberPhoto = styled.div`
	width: 100%;
	border-radius: 8px;
	overflow: hidden;
	aspect-ratio: 4 / 3;

	img {
		object-fit: cover;
	}
`;

const ContactRow = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-top: 0.75rem;

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
