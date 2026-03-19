/** @format */

import styled from "styled-components";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Image from "next/image";
import { FC, memo } from "react";
import { useRouter } from "next/router";

type Props = {
	src: string;
	title: string;
	category?: string;
	slug?: string;
};

const GridItem: FC<Props> = ({ src, title, category = "Project", slug }) => {
	const router = useRouter();
	return (
		<Wrapper
			onClick={() => {
				router.push({
					pathname: "/work-detail",
					query: { project: slug || title.toLowerCase().replace(/\s+/g, "-") },
				});
			}}>
			<ContentContainer>
				<ImageContainer>
					<Image
						src={src ? src : "/home/work3.jpg"}
						alt='work Image'
						width={500}
						height={500}
						layout='responsive'
					/>
				</ImageContainer>
				<Content>
					<div className='content'>
						<div className='title'> {title}</div>
						<div className='icons'>
							View Detail
							<ArrowForwardIcon
								style={{ marginLeft: "1rem", color: "#00d0b0" }}
							/>
						</div>
					</div>
					<div className='design'>{category}</div>
				</Content>
			</ContentContainer>
		</Wrapper>
	);
};

export default memo(GridItem);

const Wrapper = styled.div`
	width: 100%;

	.design {
		color: #878599;
	}
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid #cfced6;
	padding-bottom: 1rem;
	overflow: hidden;
	transition: var(--transition-duration);
	cursor: pointer;
	background: white;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	&:hover {
		border: 1px solid var(--color-secondary);
		transform: translate3d(0, -5px, 0);
		-webkit-transform: translate3d(0, -5px, 0);
		-moz-transform: translate3d(0, -5px, 0);
		-ms-transform: translate3d(0, -5px, 0);
		-o-transform: translate3d(0, -5px, 0);
	}

	width: 100%;
`;

const ImageContainer = styled.div`
	width: 100%;
	aspect-ratio: 16 / 10;
	overflow: hidden;
	margin-bottom: 0.75rem;
	img {
		object-fit: cover;
		display: block;
	}
`;

const Content = styled.div`
	width: 100%;
	padding: 1rem;
	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.content {
		margin-bottom: 0.75rem;
		gap: 0.75rem;
		.title {
			font-weight: bold;
			// color: var(--color-primary);
			flex: 1;
		}
		.icons {
			color: var(--color-secondary);
			white-space: nowrap;
			font-size: 0.95rem;
		}
	}
`;
