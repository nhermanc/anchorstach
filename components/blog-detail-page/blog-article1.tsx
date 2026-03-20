/** @format */

import Image from "next/image";
import styled from "styled-components";
import { FC, useEffect, memo, useState } from "react";

type BlogItem = {
	id: string;
	title: string;
	image: string;
	authorName: string;
	authorAvatar: string;
	content: string;
};

interface Props {
	blogItem: BlogItem;
}

const BlogArticle1: FC<Props> = ({ blogItem }) => {
	const [authorAvatarSrc, setAuthorAvatarSrc] = useState<string>(
		blogItem.authorAvatar || "/about-us/avatar-placeholder.svg",
	);

	useEffect(() => {
		window.scrollTo({
			top: 0,
		});
	}, []);

	useEffect(() => {
		setAuthorAvatarSrc(blogItem.authorAvatar || "/about-us/avatar-placeholder.svg");
	}, [blogItem.authorAvatar]);

	return (
		<AboutAsWrapper>
			<AbsoluteContainer>
				<CustomContainer>
					<div className='content-container'>
						<ImageContainer
							style={{
								position: "relative",
								cursor: "pointer",
							}}>
							<Image
								src={blogItem.image}
								alt='qsak Image'
								layout='fill'
								objectFit='cover'
							/>
						</ImageContainer>
					</div>
				</CustomContainer>
			</AbsoluteContainer>

			<CustomContainer>
				<BlogContent>
					<User>
						<AuthorPhoto
							src={authorAvatarSrc}
							alt={blogItem.authorName}
							onError={() => setAuthorAvatarSrc("/about-us/avatar-placeholder.svg")}
						/>
						<div>
							<p
								style={{
									fontWeight: "bold",
									color: "#0f0b33",
									marginBottom: "0px",
								}}>
								{blogItem.authorName}
							</p>
							<p style={{ color: "#878599" }}>Author</p>
						</div>
					</User>

					<p>
						{blogItem.content}
					</p>

					<h2>Why Branding?</h2>
					<p>
						Consistent product language and predictable user journeys are
						the core of business trust. Your brand is not only a logo; it
						is every interaction your customer has with your service.
					</p>
					<p>
						Static data is currently used in this page and can be swapped
						with backend data in the next version without changing the UI
						structure.
					</p>
					<p>
						We keep each article model in one data source with `id`, title,
						image, author, and content fields so it matches what a future
						database response would look like.
					</p>
				</BlogContent>
			</CustomContainer>
		</AboutAsWrapper>
	);
};

export default memo(BlogArticle1);

const AboutAsWrapper = styled.div`
	min-height: 90vh;
	background: #f8fafc;
	background-image: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0.9),
			rgba(255, 255, 255, 0.9)
		),
		url("/blog/blog.webp");
	background-size: cover;
	background-position: center;

	padding: 5rem 9%;
	position: relative;

	@media (min-width: 768px) {
		padding: 8rem 9% !important;
	}
	@media (min-width: 1169px) {
		padding-top: 400px !important;
	}

	color: #0f0b33;
`;

const CustomContainer = styled.div`
	width: 100%;
	max-width: var(--max-width);
	overflow: hidden;
	margin: 0 auto;
	position: relative;
`;

const AbsoluteContainer = styled.div`
	width: 100vw;
	position: absolute;
	top: -270.5px;
	left: 0;
	right: 0;
	padding: 0 9%;

	.content-container {
		max-width: 1170px;
		height: 541px;
		width: 100%;
		margin: 0 auto;
	}

	@media (max-width: 1169px) {
		display: none;
	}
`;

const ImageContainer = styled.div`
	min-height: 100%;
	min-width: 100%;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	background-color: white;
	overflow: hidden;
`;

const User = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	margin-top: 1.2rem;
	margin-bottom: 1rem;

	p {
		margin-bottom: 0;
	}
`;

const AuthorPhoto = styled.img`
	width: 70px;
	height: 70px;
	border-radius: 50%;
	object-fit: cover;
	object-position: 50% 22%;
	border: 1px solid #dbe2f0;
	background: #f3f6fb;
`;

const BlogContent = styled.div`
	max-width: 927px;
	margin: 0 auto;

	h2 {
		font-family: Poppins;
		font-style: normal;
		font-weight: bold;
		font-size: 24px;
		line-height: 150%;
		color: #0f0b33;
		margin-bottom: 2rem;

		@media (max-width: 768px) {
			font-size: 1.4rem;
		}
	}

	p {
		margin-bottom: 2rem;
		line-height: var(--line-height);
		color: #878599;
		@media (min-width: 768px) {
			font-size: 1.1rem;
		}
	}
`;
