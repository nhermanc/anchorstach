/** @format */

import Image from "next/image";
import { useRouter } from "next/router";
import { FC, memo, useMemo } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import MainNavigation from "../layout/main-navigation";
import GridItem from "../work-page/grid-item";
import {
	getServiceBySlug,
	serviceItems,
	strategicPartner,
	workProjectItems,
} from "../../app/company-data";

const categoryAliases: Record<string, string[]> = {
	"Web Solutions": ["Web Development"],
	"Mobile App Solutions": ["App Development"],
	"ERP & Business Systems": ["Odoo Development"],
	"Blockchain Solutions": ["Blockchain Platform"],
	"AI Solutions": ["AI Integration & Platforms"],
	"Desktop Software": ["Desktop Applications", "Desktop Application"],
};

const ServiceDetailComponent: FC = () => {
	const router = useRouter();
	const categoryParam = router.query.category;
	const categorySlug =
		typeof categoryParam === "string" ? categoryParam : serviceItems[0].slug;

	const service = getServiceBySlug(categorySlug);

	const matchedRelatedWork = useMemo(() => {
		if (!service) {
			return workProjectItems;
		}

		const categoryMatchers = [
			service.title,
			...(categoryAliases[service.title] || []),
		];

		const matched = workProjectItems.filter((item) =>
			categoryMatchers.includes(item.category),
		);

		if (matched.length > 0) {
			return matched;
		}

		return workProjectItems;
	}, [service]);
	const relatedWork = matchedRelatedWork.slice(0, 3);
	const hasMoreRelatedWork = matchedRelatedWork.length > 3;

	if (!service) {
		return (
			<>
				<MainNavigation />
				<Wrapper>
					<Container>
						<FallbackCard>
							<h2>Service not found</h2>
							<p>
								We could not find this service category. Please choose a valid
								service from the Services page.
							</p>
							<ActionButton
								type='button'
								onClick={() => {
									router.push("/services");
								}}>
								Back to Services
							</ActionButton>
						</FallbackCard>
					</Container>
				</Wrapper>
			</>
		);
	}

	return (
		<>
			<MainNavigation />
			<Wrapper>
				<Container>
					<BackButton
						type='button'
						onClick={() => {
							router.push("/services");
						}}>
						<ArrowBackIcon style={{ marginRight: "0.35rem" }} />
						Back to Services
					</BackButton>

					<HeroSection>
						<HeroContent>
							<Label>SERVICE DETAIL</Label>
							<h1>{service.title}</h1>
							<h2>{service.detailHeading}</h2>
							<p>{service.detailDescription}</p>
							{service.slug === "ai-solutions" && (
								<PartnerCallout>
									<p>
										<strong>Strategic partner:</strong> We work with{" "}
										<a
											href={strategicPartner.url}
											target='_blank'
											rel='noopener noreferrer'>
											{strategicPartner.name}
										</a>{" "}
										for teams that want AI sales agents on their website,
										link-in-bio, and social channels—alongside the custom AI
										features and integrations we design and ship for you.
									</p>
								</PartnerCallout>
							)}
							<ActionButton
								type='button'
								onClick={() => {
									router.push("/contact");
								}}>
								Start This Service
							</ActionButton>
						</HeroContent>
						<HeroImage>
							<Image
								src={service.heroImage}
								alt={service.title}
								layout='fill'
								objectFit='cover'
							/>
						</HeroImage>
					</HeroSection>

					<DetailsGrid>
						<DetailCard>
							<h3>What We Focus On</h3>
							<ul>
								{service.highlights.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</DetailCard>
						<DetailCard>
							<h3>Typical Deliverables</h3>
							<ul>
								{service.deliverables.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</DetailCard>
					</DetailsGrid>

					<RelatedSection>
						<h2>Related Work</h2>
						<p>Projects delivered under {service.title}</p>
						<RelatedGrid>
							{relatedWork.map((item) => (
								<GridItem
									key={`service-related-${item.title}`}
									src={item.image}
									title={item.title}
									category={item.category}
									slug={item.slug}
								/>
							))}
						</RelatedGrid>
						{hasMoreRelatedWork && (
							<ViewMoreButton
								type='button'
								onClick={() => {
									router.push({
										pathname: "/work",
										query: { category: service.title },
									});
								}}>
								View More
							</ViewMoreButton>
						)}
					</RelatedSection>
				</Container>
			</Wrapper>
		</>
	);
};

export default memo(ServiceDetailComponent);

const Wrapper = styled.section`
	background: #e5e5e5;
	min-height: 100vh;
	padding: 8.5rem 9% 5rem;
`;

const Container = styled.div`
	max-width: var(--max-width1250);
	margin: 0 auto;
`;

const BackButton = styled.button`
	display: inline-flex;
	align-items: center;
	border: 1px solid #d3d9e7;
	background: #ffffff;
	color: #0f0b33;
	border-radius: 999px;
	padding: 0.45rem 0.9rem;
	cursor: pointer;
	font-weight: 600;
	margin-bottom: 1.2rem;
`;

const HeroSection = styled.div`
	display: grid;
	grid-template-columns: 1.15fr 1fr;
	gap: 1.25rem;
	align-items: stretch;

	@media (max-width: 992px) {
		grid-template-columns: 1fr;
	}
`;

const HeroContent = styled.article`
	background: white;
	border: 1px solid #e1e6f2;
	padding: 1.5rem;
	box-shadow: 0 2px 8px rgba(15, 11, 51, 0.12);

	h1 {
		color: var(--color-secondary-second);
		margin-bottom: 0.7rem;
	}

	h2 {
		color: #0f0b33;
		font-size: 1.6rem;
		margin-bottom: 0.8rem;
		line-height: 1.4;
	}

	p {
		color: #6f6d85;
		line-height: var(--line-height);
		max-width: 44rem;
	}
`;

const PartnerCallout = styled.div`
	margin-top: 1rem;
	padding: 1rem 1.1rem;
	border-radius: 6px;
	border-left: 4px solid var(--color-secondary);
	background: #f8fbff;

	p {
		margin: 0;
		color: #0f0b33;
		font-size: 0.95rem;
		line-height: 1.65;
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
`;

const Label = styled.span`
	display: inline-flex;
	margin-bottom: 0.7rem;
	padding: 0.35rem 0.65rem;
	background: #f2f6ff;
	border: 1px solid #dbe4f8;
	border-radius: 999px;
	font-size: 0.82rem;
	font-weight: 700;
	color: #0f0b33;
`;

const HeroImage = styled.div`
	position: relative;
	min-height: 320px;
	overflow: hidden;
	border: 1px solid #e1e6f2;
	box-shadow: 0 2px 8px rgba(15, 11, 51, 0.12);

	@media (max-width: 992px) {
		min-height: 280px;
	}
`;

const ActionButton = styled.button`
	margin-top: 1.2rem;
	min-height: 48px;
	padding: 0.5rem 1rem;
	border: 1px solid #0f0b33;
	background: #0f0b33;
	color: #ffffff;
	font-weight: 700;
	border-radius: 4px;
	cursor: pointer;
`;

const DetailsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1.25rem;
	margin-top: 1.25rem;

	@media (max-width: 900px) {
		grid-template-columns: 1fr;
	}
`;

const DetailCard = styled.article`
	background: white;
	border: 1px solid #e1e6f2;
	padding: 1.25rem;
	box-shadow: 0 2px 8px rgba(15, 11, 51, 0.12);

	h3 {
		color: #0f0b33;
		margin-bottom: 0.75rem;
	}

	ul {
		display: grid;
		gap: 0.6rem;
	}

	li {
		color: #6f6d85;
		line-height: 1.6;
		margin-left: 1rem;
	}
`;

const RelatedSection = styled.section`
	margin-top: 2.25rem;

	h2 {
		color: var(--color-secondary-second);
		margin-bottom: 0.5rem;
	}

	p {
		color: #6f6d85;
		margin-bottom: 1rem;
	}
`;

const RelatedGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 1.25rem;

	@media (max-width: 992px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (max-width: 700px) {
		grid-template-columns: 1fr;
	}
`;

const ViewMoreButton = styled.button`
	margin-top: 1rem;
	min-height: 44px;
	padding: 0.45rem 1rem;
	border: 1px solid #0f0b33;
	background: #0f0b33;
	color: #ffffff;
	font-weight: 700;
	border-radius: 4px;
	cursor: pointer;
`;

const FallbackCard = styled.article`
	background: white;
	border: 1px solid #e1e6f2;
	padding: 1.5rem;
	box-shadow: 0 2px 8px rgba(15, 11, 51, 0.12);

	h2 {
		color: #0f0b33;
		margin-bottom: 0.6rem;
	}

	p {
		color: #6f6d85;
		margin-bottom: 1rem;
	}
`;
