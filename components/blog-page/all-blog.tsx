/** @format */
import styled from "styled-components";
import Image from "next/image";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import BlogGrid from "./blog-grid";

interface BlogItem {
	id: string;
	title: string;
	category: string;
	image: string;
	authorName: string;
	authorAvatar: string;
	excerpt: string;
}

interface BlogCategory {
	title: string;
	slug: string;
}

interface Props {
	items: BlogItem[];
	activeCategory: string;
	onCategoryChange: (value: string) => void;
	searchValue: string;
	onSearchChange: (value: string) => void;
	categoryItems: BlogCategory[];
}

const AllBlog: React.FC<Props> = ({
	items,
	activeCategory,
	onCategoryChange,
	searchValue,
	onSearchChange,
	categoryItems,
}) => {
	const router = useRouter();
	const BLOGS_PER_PAGE = 7; /* 1 featured + 6 grid items */
	const [currentPage, setCurrentPage] = useState<number>(1);
	/** Only set after load error — keeps first paint identical on server & client (no hydration mismatch). */
	const [featuredAvatarFailed, setFeaturedAvatarFailed] = useState(false);

	const totalPages = Math.max(1, Math.ceil(items.length / BLOGS_PER_PAGE));

	useEffect(() => {
		setCurrentPage(1);
	}, [activeCategory, searchValue]);

	useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

	const paginatedItems = useMemo(() => {
		const start = (currentPage - 1) * BLOGS_PER_PAGE;
		return items.slice(start, start + BLOGS_PER_PAGE);
	}, [items, currentPage]);

	const featuredBlog = paginatedItems[0] ?? items[0];
	const gridItems = paginatedItems.slice(1);

	const featuredAuthorAvatar =
		featuredBlog?.authorAvatar || "/about-us/avatar-placeholder.svg";
	const featuredAvatarSrc = featuredAvatarFailed
		? "/about-us/avatar-placeholder.svg"
		: featuredAuthorAvatar;

	useEffect(() => {
		setFeaturedAvatarFailed(false);
	}, [featuredAuthorAvatar]);

	return (
		<Wrapper>
			<CustomContainer>
				<Container>
					<BlogTopContainer>
						<h2 style={{ color: "var(--color-grey-800)" }}>Our Latest Blog</h2>
						<FilterRow>
							<CategorySelect
								value={activeCategory}
								onChange={(event) => onCategoryChange(event.target.value)}>
								<option value='All'>All Categories</option>
								{categoryItems.map((cat) => (
									<option key={cat.slug} value={cat.title}>
										{cat.title}
									</option>
								))}
							</CategorySelect>
							<SearchContainer>
								<SearchIcon className='icon' />
								<label htmlFor='text'> </label>
								<input
									type='text'
									id='text'
									placeholder='Search by title, author, category'
									value={searchValue}
									onChange={(event) => onSearchChange(event.target.value)}
								/>
							</SearchContainer>
						</FilterRow>
					</BlogTopContainer>

					<AnimatedPageContent key={currentPage}>
						{featuredBlog ? (
							<>
								<MiddleContainer>
									<ImageContainer
										style={{
											position: "relative",
											cursor: "pointer",
										}}>
										<Image
											src={featuredBlog.image}
											alt='Hero Image'
											layout='fill'
											objectFit='cover'
										/>
									</ImageContainer>
									<ContentSection>
										<h2 style={{ color: "var(--color-grey-800)" }}>
											{featuredBlog.title}
										</h2>
										<div className='user'>
											<AuthorPhoto
												src={featuredAvatarSrc}
												alt={featuredBlog.authorName}
												onError={() => setFeaturedAvatarFailed(true)}
											/>
											<p
												className='name'
												style={{ color: "var(--color-grey-800)" }}>
												{featuredBlog.authorName}
											</p>
											<p>
												<span>Author</span>
											</p>
										</div>
										<div className='article'>
											<p>{featuredBlog.excerpt}</p>
										</div>

										<HiddenImageContainer>
											<Image
												src={featuredBlog.image}
												alt='Hero Image'
												width={500}
												height={400}
												layout='responsive'
											/>
										</HiddenImageContainer>

										<CustomButton
											onClick={() => {
												router.push({
													pathname: "/detail-blog",
													query: { blog: featuredBlog.id },
												});
											}}>
											READ MORE
										</CustomButton>
									</ContentSection>
								</MiddleContainer>
								<BlogGrid items={gridItems} />
							</>
						) : (
							<EmptyResults>
								<p>No articles match your filters.</p>
								<p className='hint'>Try another category or search term.</p>
							</EmptyResults>
						)}
					</AnimatedPageContent>
					<PaginationContainer>
						<IconButton
							onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
							disabled={currentPage === 1}
							aria-label='Previous page'>
							<ChevronLeftIcon />
						</IconButton>
						<PageInfo>
							Page {currentPage} of {totalPages}
						</PageInfo>
						<IconButton
							onClick={() =>
								setCurrentPage((prev) => Math.min(totalPages, prev + 1))
							}
							disabled={currentPage === totalPages}
							aria-label='Next page'>
							<ChevronRightIcon />
						</IconButton>
					</PaginationContainer>
				</Container>
			</CustomContainer>
		</Wrapper>
	);
};

export default memo(AllBlog);

const CustomContainer = styled.div`
	width: 100%;
	max-width: var(--max-width);
	overflow: hidden;
	margin: 0 auto;
`;

const Wrapper = styled.div`
	width: 100vw;
	min-height: 100vh;
	background: #e5e5e5;
	padding: 5rem 9%;
	padding-top: 2.5rem;
	padding-bottom: 7rem;
	position: relative;

	@media (min-width: 768px) {
		padding: 6rem 9%;
		padding-bottom: 10rem;
	}
`;

const Container = styled.div``;

const BlogTopContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	flex-wrap: wrap;
	gap: 1rem;

	h2 {
		color: var(--color-primary);
		font-size: 24px;
	}
`;

const FilterRow = styled.div`
	display: grid;
	grid-template-columns: 240px minmax(320px, 1fr);
	gap: 0.75rem;
	align-items: center;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		width: 100%;
	}
`;

const CategorySelect = styled.select`
	height: 50px;
	border-radius: 999px;
	border: 1px solid #d6dbe7;
	background: #ffffff;
	color: #0f0b33;
	padding: 0 1rem;
	font: inherit;
`;

const SearchContainer = styled.div`
	width: 100%;
	position: relative;

	@media (max-width: 568px) {
		width: 100%;
	}

	input {
		width: 100%;
		height: 50px;
		font: inherit;
		color: #0f0b33;
		border-radius: 999px;
		background: #ffffff;
		border: 1px solid #d6dbe7;
		text-align: left;
		padding: 0.9rem 1rem 0.9rem 2.9rem;
		transition: 0.3s;
		-webkit-transition: 0.3s;
		-moz-transition: 0.3s;
		-ms-transition: 0.3s;
		-o-transition: 0.3s;
		margin: 0;

		::placeholder {
			/* Chrome, Firefox, Opera, Safari 10.1+ */
			color: #0f0b33;
			opacity: 1; /* Firefox */
		}

		:-ms-input-placeholder {
			/* Internet Explorer 10-11 */
			color: #0f0b33;
		}

		::-ms-input-placeholder {
			/* Microsoft Edge */
			color: #0f0b33;
		}

		&:hover {
			border: 1px solid #00d0b0;
		}
		&:focus {
			border-color: #00d0b0;
			box-shadow: 0 0 0 3px rgba(0, 208, 176, 0.18);
		}
	}

	.icon {
		position: absolute;
		top: 50%;
		left: 14px;
		transform: translateY(-50%);
		color: #7d869a;
		z-index: 1;
		pointer-events: none;
	}
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

const MiddleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 2rem 0;
	@media (max-width: 768px) {
		flex-wrap: wrap;
		margin: 1.2rem 0;
	}
`;

const ContentSection = styled.div`
	@media (min-width: 968px) {
		min-width: 18.75rem;
	}

	width: 31.25rem;

	h2 {
		margin-bottom: 2rem;
		font-weight: 700;
		color: var(--color-primary);

		@media (min-width: 968px) {
			font-size: 3.25rem;
		}
	}

	.article {
		margin: 1rem 0;
		p {
			line-height: var(--line-height);
			color: #878599;
			@media (min-width: 968px) {
				font-size: 1.1rem;
			}
		}
	}

	.user {
		display: flex;
		align-items: center;
		gap: 0.8rem;

		.name {
			font-size: 1rem;
			font-weight: bold;
			margin-bottom: 0;
			color: var(--color-primary);
		}
		span {
			color: #878599;
			font-size: 0.9rem;
		}
	}
`;

const AuthorPhoto = styled.img`
	width: 44px;
	height: 44px;
	border-radius: 50%;
	object-fit: cover;
	object-position: 50% 22%;
	border: 1px solid #dbe2f0;
	background: #f3f6fb;
`;

const CustomButton = styled.button`
	display: block;
	width: 164px;
	height: 53px;
	font: inherit;
	cursor: pointer;
	font-weight: bold;
	background-color: #0f0b33;
	border: 1px solid #0f0b33;
	padding: 0.5rem 1rem;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	transition-duration: var(--transition-duration);
	min-width: fit-content;
	color: white;
	font-weight: bold;

	@media (max-width: 568px) {
		width: 80%;
	}

	&:hover {
		background: #1d1852;
		border-color: #1d1852;
	}
`;

const ImageContainer = styled.div`
	width: 45.125rem;
	max-width: 45.125rem;
	height: 32.688rem;
	min-width: 40.5rem;
	max-height: 43.5625rem;
	overflow: hidden;
	margin-right: 3rem;

	@media (max-width: 968px) {
		width: 28.125rem;
		height: 26.438rem;
	}

	@media (max-width: 768px) {
		display: none;
	}
`;

const HiddenImageContainer = styled.div`
	width: 100%;
	max-height: 20rem;
	overflow: hidden;
	margin: 2rem 0;

	@media (min-width: 768px) {
		display: none;
	}

	img {
		object-fit: cover;
		display: block;
	}
`;

const EmptyResults = styled.div`
	text-align: center;
	padding: 3rem 1.5rem;
	color: var(--color-grey-700, #5c5a6b);
	font-weight: 600;

	.hint {
		margin-top: 0.5rem;
		font-weight: 500;
		font-size: 0.95rem;
		color: var(--color-grey-500, #8a8799);
	}
`;

const PaginationContainer = styled.div`
	margin-top: 1.25rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	flex-wrap: wrap;
`;

const PageInfo = styled.span`
	font-weight: 600;
	color: #0f0b33;
`;
