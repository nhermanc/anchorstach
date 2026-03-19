/** @format */
import styled from "styled-components";
import { memo } from "react";

import GridItem from "./blog-grid-item";

interface BlogItem {
	id: string;
	title: string;
	category: string;
	image: string;
	authorName: string;
	authorAvatar: string;
}

interface Props {
	items: BlogItem[];
}

const BlogGrid = ({ items }: Props) => {
	return (
		<GridWrapper>
			{items.map((item) => (
				<GridItem
					key={item.id}
					src={item.image}
					title={item.title}
					blogId={item.id}
					category={item.category}
					name={item.authorName}
					authorImageSrc={item.authorAvatar}
				/>
			))}
		</GridWrapper>
	);
};

export default memo(BlogGrid);

const GridWrapper = styled.div`
	width: 100%;
	max-width: var(--max-width1250);
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 1.25rem;
	margin-top: 3rem;
	@media (max-width: 1100px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	@media (max-width: 700px) {
		grid-template-columns: 1fr;
	}
`;
