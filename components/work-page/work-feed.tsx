/** @format */

import styled from "styled-components";
import Image from "next/image";
import { Avatar, IconButton } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import CustomGrid from "./grid";
import {
	companyInfo,
	serviceItems,
	workProjectItems,
} from "../../app/company-data";	

const ITEMS_PER_PAGE = 6;

const WorkFeed: FC = () => {
	const router = useRouter();
	const [activeCategory, setActiveCategory] = useState<string>("All");
	const [searchValue, setSearchValue] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);

	const categoryAliases: Record<string, string[]> = {
		"Web Solutions": ["Web Development"],
		"Mobile App Solutions": ["App Development"],
		"ERP & Business Systems": ["Odoo Development"],
		"Blockchain Solutions": ["Blockchain Platform"],
		"AI Solutions": ["AI Integration & Platforms"],
		"Desktop Software": ["Desktop Applications", "Desktop Application"],
	};

	useEffect(() => {
		const initialCategory =
			typeof router.query.category === "string" ? router.query.category : "";
		if (!initialCategory) {
			return;
		}
		const validCategoryTitles = serviceItems.map((item) => item.title);
		if (initialCategory === "All" || validCategoryTitles.includes(initialCategory)) {
			setActiveCategory(initialCategory);
		}
	}, [router.query.category]);

	useEffect(() => {
		setCurrentPage(1);
	}, [activeCategory, searchValue]);

	const filteredWorkItems = useMemo(() => {
		const lowerSearch = searchValue.trim().toLowerCase();
		const categoryMatchers =
			activeCategory === "All"
				? []
				: [activeCategory, ...(categoryAliases[activeCategory] || [])];

		return workProjectItems.filter((item) => {
			const categoryMatches =
				activeCategory === "All" || categoryMatchers.includes(item.category);
			const searchMatches =
				!lowerSearch ||
				item.title.toLowerCase().includes(lowerSearch) ||
				item.category.toLowerCase().includes(lowerSearch) ||
				item.projectType.toLowerCase().includes(lowerSearch);
			return categoryMatches && searchMatches;
		});
	}, [activeCategory, searchValue]);

	const totalPages = Math.max(1, Math.ceil(filteredWorkItems.length / ITEMS_PER_PAGE));

	const paginatedItems = useMemo(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		return filteredWorkItems.slice(start, start + ITEMS_PER_PAGE);
	}, [filteredWorkItems, currentPage]);

	useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

	const recentProject = workProjectItems[0];
	const trimmedSearch = searchValue.trim();
	const filterSummaryText = useMemo(() => {
		const categoryText =
			activeCategory === "All" ? "all categories" : activeCategory;
		const projectText =
			filteredWorkItems.length === 1 ? "project" : "projects";

		if (trimmedSearch) {
			return `Showing ${filteredWorkItems.length} ${projectText} in ${categoryText} for "${trimmedSearch}"`;
		}
		return `Showing ${filteredWorkItems.length} ${projectText} in ${categoryText}`;
	}, [activeCategory, filteredWorkItems.length, trimmedSearch]);

	return (
		<WorkWrapper>
			<AbsoluteContainer>
				<CustomContainer>
					<FirstContainer>
						<BadgeContainer>
							<button className='web' style={{ color: "var(--color-grey-500)" }}>Most Recent Project</button>
						</BadgeContainer>
						<h2 style={{ color: "var(--color-grey-800)" }}>
							{recentProject.title}
						</h2>
						<p>
							{recentProject.overview}
						</p>
						<CustomButton
							onClick={() => {
								router.push({
									pathname: "/work-detail",
									query: { project: recentProject.slug },
								});
							}}>
							VIEW DETAIL
						</CustomButton>
						<div className='users'>
							<div className='image'>
								<Avatar src='/work/work1.png' />
								<Avatar src='/work/work2.png' />
								<Avatar src='/work/work3.png' />
							</div>
							<div className='details'>
								<h3 style={{ color: "var(--color-grey-500)" }}>Core Delivery Team</h3>
								<p>Engineering, Product, QA</p>
							</div>
						</div>
					</FirstContainer>

					<SecondContainer>
						<AbsoluteImageContainer
							style={{
								position: "relative",
								cursor: "pointer",
							}}>
							<Image
								src={recentProject.image}
								alt='dashborad Image'
								layout='fill'
								objectFit='cover'
							/>
						</AbsoluteImageContainer>
					</SecondContainer>
				</CustomContainer>
			</AbsoluteContainer>

			<HiddenOnBigText>
				<h2>OUR WORK</h2>
				<p className='head-co'>Selected projects by {companyInfo.name}</p>
			</HiddenOnBigText>

			<ButtonsWrapper>
				<FilterContainer>
					<div className='control'>
						<label htmlFor='work-category'>Category</label>
						<select
							id='work-category'
							value={activeCategory}
							onChange={(event) => setActiveCategory(event.target.value)}>
							<option value='All'>All Categories</option>
							{serviceItems.map((service) => (
								<option key={service.slug} value={service.title}>
									{service.title}
								</option>
							))}
						</select>
					</div>
					<div className='control'>
						<label htmlFor='work-search'>Search</label>
						<input
							id='work-search'
							type='text'
							placeholder='Search projects...'
							value={searchValue}
							onChange={(event) => setSearchValue(event.target.value)}
						/>
					</div>
				</FilterContainer>
			</ButtonsWrapper>
			<FilterSummary>{filterSummaryText}</FilterSummary>

			<AnimatedPageContent key={currentPage}>
				<CustomGrid items={paginatedItems} />
			</AnimatedPageContent>

			<PaginationContainer>
				<IconButton
					onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
					disabled={currentPage === 1}
					aria-label='Previous page'>
					<ChevronLeftIcon />
				</IconButton>
				<PageInfo>
					Page {currentPage} of {totalPages}
				</PageInfo>
				<IconButton
					onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
					disabled={currentPage === totalPages}
					aria-label='Next page'>
					<ChevronRightIcon />
				</IconButton>
			</PaginationContainer>

			<WorkSection>
				<h2>WORK WITH US</h2>
				<div className='bottom-inner-container'>
					<h1>Ready to build your next platform with us?</h1>

					<p>
						Share your idea with {companyInfo.name} and we will help you
						turn it into a reliable, production-ready digital product.
					</p>
				</div>

				<CustomButton
					onClick={() => {
						router.push("/contact");
					}}>
					CONTACT US
				</CustomButton>
			</WorkSection>
		</WorkWrapper>
	);
};

export default memo(WorkFeed);

const WorkWrapper = styled.section`
	position: relative;
	min-height: 20vh;
	padding: 5rem 9%;

	background: #e5e5e5;
	@media (min-width: 768px) {
		padding: 8rem 9% !important;
		padding-top: 15rem !important;
	}

	@media (min-width: 1169px) {
		padding-top: 380px !important;
	}

	* {
		opacity: 0.99;
		z-index: 50;
	}
`;

const FirstContainer = styled.div`
	flex: 1;
	max-width: 570px;
	width: 100%;
	padding: 2rem;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	background-color: white;
	button.web {
		min-width: 150px;
		color: var(--color-primary);
	}
	h2 {
		margin: 1.4rem;
		font-style: normal;
		font-weight: 700;
		font-size: 52px;
		line-height: 150%;
		color: var(--color-primary);
	}
	p {
		color: #6f6d85;
		font-style: normal;
		font-weight: normal;
		font-size: 1rem;
		line-height: 150%;
	}
	.users {
		margin-top: 2rem;
		display: flex;
		align-items: center;
	}
	.details {
		padding-top: 1rem;
		h3 {
			font-weight: bold;
			color: var(--color-primary);
		}
		p {
			font-size: 14px;
			color: #878599;
		}
	}
	.image {
		display: flex;
		align-items: center;
		margin-right: 2rem;
	}
`;

const SecondContainer = styled(FirstContainer)`
	padding: 0;
`;

const AbsoluteImageContainer = styled.div`
	min-height: 100%;
	min-width: 100%;
	background-color: white;
	overflow: hidden;
`;

const AbsoluteContainer = styled.div`
	width: 100%;
	position: absolute;
	top: -280px;
	left: 0;
	right: 0;
	min-height: 600px;

	@media (max-width: 1169px) {
		display: none;
	}
`;

const CustomContainer = styled.div`
	width: 100%;
	max-width: var(--max-width);
	overflow: hidden;
	margin: 0 auto;
	display: flex;
	justify-content: center;
`;

const HiddenOnBigText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid #cfced6;
	min-height: 150px;
	overflow: hidden;
	transition: var(--transition-duration);
	background: white;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	padding: 2rem 0;
	margin: 0 auto;
	margin-bottom: 4rem;
	h2 {
		margin-bottom: 1.3rem;
		color: var(--color-secondary-second);
	}
	p {
		font-size: 1rem;
		font-weight: bold;
		font-size: 1.1rem;
	}
	@media (min-width: 992px) {
		display: none;
	}
`;

const ButtonsWrapper = styled.div`
	margin-bottom: 2rem;
	display: flex;
	justify-content: center;

	@media (min-width: 992px) {
		margin-bottom: 3rem;
	}
`;

const FilterContainer = styled.div`
	width: 100%;
	max-width: 900px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;

	@media (max-width: 700px) {
		grid-template-columns: 1fr;
	}

	.control {
		display: flex;
		flex-direction: column;
	}

	label {
		margin-bottom: 0.35rem;
		font-weight: 700;
		color: #0f0b33;
	}

	select,
	input {
		height: 46px;
		border: 1px solid #d1d8e6;
		background: #ffffff;
		border-radius: 6px;
		padding: 0 0.9rem;
		color: #0f0b33;
	}
`;

const FilterSummary = styled.p`
	width: 100%;
	max-width: 900px;
	margin: -0.8rem auto 0.8rem;
	color: #6f6d85;
	font-size: 0.95rem;
`;

const AnimatedPageContent = styled.div`
	animation: fadeIn 0.4s ease-out forwards;

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

const PaginationContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	margin-top: 1.5rem;
	flex-wrap: wrap;
`;

const PageInfo = styled.span`
	font-weight: 600;
	color: #0f0b33;
`;

const BadgeContainer = styled.div`
	button {
		min-width: 180px;
		min-height: 2rem;
		cursor: default;
		font: inherit;
		background-color: #f2f6ff;
		border: 1px solid #d9e5ff;
		border-radius: 30px;
		padding: 0.6rem 0.9rem;
		font-weight: bold;
		color: #0f0b33;
	}
`;

const WorkSection = styled.div`
	width: 100%;
	max-width: var(--max-width1250);
	overflow: hidden;
	margin: 0 auto;
	margin-top: 5rem;
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
		color: #6f6d85;
		line-height: var(--line-height);
		max-width: 36.5625rem;
		margin: 1rem 0 !important;
		font-size: 1.1rem;
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
