/** @format */

import styled from "styled-components";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React, { memo, useState } from "react";
import { useRouter } from "next/router";

interface GridItemProps {
	src: string;
	title: string;
	blogId: string;
	category: string;
	name: string;
	authorImageSrc: string;
}

type TopWrapperProps = {
	bgSrc: string;
};

const GridItem: React.FC<GridItemProps> = ({
	src,
	title,
	blogId,
	category,
	name,
	authorImageSrc,
}) => {
	const router = useRouter();
	const [avatarSrc, setAvatarSrc] = useState<string>(
		authorImageSrc || "/about-us/avatar-placeholder.svg",
	);

	return (
		<Wrapper
			onClick={() => {
				router.push({
					pathname: "/detail-blog",
					query: { blog: blogId },
				});
			}}>
			<TopWrapper bgSrc={src}>
				<p className='badge'>{category}</p>
				<p className='post-title'>{title}</p>
				<Author>
					<AuthorPhoto
						src={avatarSrc}
						alt={name}
						onError={() => setAvatarSrc("/about-us/avatar-placeholder.svg")}
					/>
					{name}
				</Author>
			</TopWrapper>
			<BottomWrapper>
				<div style={{ color: "var(--color-grey-800)" }} className='title'> Read More </div>
				<div className='icons'>
					<ArrowForwardIcon
						style={{
							marginLeft: "1rem",
							color: "#00d0b0",
							fontSize: "2rem",
						}}
					/>
				</div>
			</BottomWrapper>
		</Wrapper>
	);
};

export default memo(GridItem);

const Wrapper = styled.div`
	height: 27rem;
	width: 100%;
	cursor: pointer;
	overflow: hidden;
	transition: var(--transition-duration);
	border-radius: 10px;
	border: 1px solid #d7ddea;
	box-shadow: 0 4px 14px rgba(15, 11, 51, 0.1);

	&:hover {
		border-color: #00d0b0;
		transform: translate3d(0, -5px, 0);
		-webkit-transform: translate3d(0, -5px, 0);
		-moz-transform: translate3d(0, -5px, 0);
		-ms-transform: translate3d(0, -5px, 0);
		-o-transform: translate3d(0, -5px, 0);
	}
`;

const Author = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-weight: 600;
`;

const AuthorPhoto = styled.img`
	width: 42px;
	height: 42px;
	border-radius: 50%;
	object-fit: cover;
	object-position: 50% 22%;
	border: 1px solid rgba(255, 255, 255, 0.7);
	background: #f3f6fb;
`;

const TopWrapper = styled.div<TopWrapperProps>`
	height: 21.5rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	color: white;
	padding: 2rem;

	background-image: linear-gradient(
			180deg,
			rgba(15, 11, 51, 0.18) 0%,
			rgba(15, 11, 51, 0.86) 100%
		),
		url(${(props) => props.bgSrc});
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	box-shadow: 0 2px 8px rgba(15, 11, 51, 0.5);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);

	.post-title {
		font-size: 20px;
		font-weight: 700;
		margin-bottom: 0.2rem;
	}

	.badge {
		display: inline-flex;
		width: fit-content;
		padding: 0.3rem 0.55rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.4);
		font-size: 0.78rem;
		font-weight: 700;
		margin-bottom: 0.6rem;
	}
`;

const BottomWrapper = styled.div`
	height: 5.5rem;
	display: flex;
	padding: 1rem 1.25rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: white;

	.title {
		font-size: 1rem;
		font-weight: 700;
		color: #0f0b33;
	}
`;
