/** @format */

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import React, { FC } from "react";

import { blogItems } from "../../app/company-data";

const PREVIEW_COUNT = 3;

const BlogTeaser: FC = () => {
	const posts = blogItems.slice(0, PREVIEW_COUNT);

	return (
		<Section aria-labelledby="home-blog-heading">
			<Inner>
				<HeaderRow>
					<div>
						<h2 id="home-blog-heading">BLOG</h2>
						<p className="section-heading">Insights on software and product delivery</p>
						<p className="lede">
							Articles on web development, mobile apps, Odoo, AI, and how we build
							reliable products — updated regularly.
						</p>
					</div>
					<Link href="/blog" prefetch passHref>
						<ViewAllButton>View all articles</ViewAllButton>
					</Link>
				</HeaderRow>

				<CardGrid>
					{posts.map((post) => (
						<Link
							key={post.id}
							href={{
								pathname: "/detail-blog",
								query: { blog: post.id },
							}}
							passHref
							prefetch>
							<CardLink>
								<div className="thumb">
									<Image
										src={post.image}
										alt={post.title}
										layout="fill"
										objectFit="cover"
										sizes="(max-width: 768px) 100vw, 33vw"
									/>
								</div>
								<p className="cat">{post.category}</p>
								<h3>{post.title}</h3>
								<p className="excerpt">{post.excerpt}</p>
								<span className="read">Read article</span>
							</CardLink>
						</Link>
					))}
				</CardGrid>
			</Inner>
		</Section>
	);
};

export default BlogTeaser;

const Section = styled.section`
	background: #f0f4f8;
	color: #0f0b33;
	padding: 3.5rem 9%;
	@media (min-width: 768px) {
		padding: 4.5rem 9%;
	}
`;

const Inner = styled.div`
	width: 100%;
	max-width: var(--max-width);
	margin: 0 auto;
`;

const HeaderRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-start;
	gap: 1.5rem;
	margin-bottom: 2rem;

	h2 {
		margin-bottom: 0.75rem;
		color: var(--color-secondary-second);
		font-size: 1rem;
		letter-spacing: 0.06em;
	}
	.section-heading {
		font-weight: 700;
		font-size: clamp(1.35rem, 2vw + 1rem, 2rem);
		line-height: 1.3;
		max-width: 32rem;
		margin: 0 0 0.75rem;
		color: #0f0b33;
	}
	.lede {
		margin: 0;
		max-width: 36rem;
		line-height: 1.65;
		color: #3d3a54;
		font-size: 1.05rem;
	}
`;

const ViewAllButton = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-height: 46px;
	padding: 0.5rem 1.25rem;
	border-radius: 6px;
	border: 2px solid var(--color-secondary, #00d0b0);
	background: transparent;
	color: #0f0b33;
	font-weight: 700;
	font-size: 0.95rem;
	text-decoration: none;
	cursor: pointer;
	transition: background 0.2s ease, color 0.2s ease;
	white-space: nowrap;
	&:hover {
		background: var(--color-secondary, #00d0b0);
		color: #fff;
	}
`;

const CardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 1.5rem;

	@media (max-width: 992px) {
		grid-template-columns: 1fr;
		max-width: 28rem;
		margin: 0 auto;
	}

	a {
		text-decoration: none;
		color: inherit;
		height: 100%;
	}
`;

const CardLink = styled.a`
		background: #fff;
		border-radius: 10px;
		overflow: hidden;
		border: 1px solid #d7ddea;
		box-shadow: 0 4px 14px rgba(15, 11, 51, 0.08);
		cursor: pointer;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		padding: 0 0 1.25rem;
		display: flex;
		flex-direction: column;
		text-align: left;
		height: 100%;
		box-sizing: border-box;
		&:hover {
			transform: translateY(-4px);
			box-shadow: 0 8px 24px rgba(15, 11, 51, 0.12);
		}
		&:focus-visible {
			outline: 2px solid var(--color-secondary, #00d0b0);
			outline-offset: 2px;
		}

		.thumb {
			position: relative;
			width: 100%;
			aspect-ratio: 16 / 10;
			background: #e5e5e5;
		}

		.cat {
			margin: 1rem 1.25rem 0.35rem;
			font-size: 0.75rem;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.04em;
			color: var(--color-secondary, #00d0b0);
		}

		h3 {
			margin: 0 1.25rem 0.5rem;
			font-size: 1.05rem;
			line-height: 1.4;
			color: #0f0b33;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.excerpt {
			margin: 0 1.25rem 0.75rem;
			font-size: 0.95rem;
			line-height: 1.55;
			color: #6f6d85;
			flex: 1;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.read {
			margin: 0 1.25rem;
			font-weight: 700;
			font-size: 0.9rem;
			color: var(--color-secondary, #00d0b0);
		}
`;
