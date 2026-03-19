/** @format */

import styled from "styled-components";
import React, { FC, memo } from "react";

import GridItem from "./grid-item";
type WorkItem = {
	title: string;
	category: string;
	image: string;
	slug: string;
};

interface Props {
	items: WorkItem[];
}

const CustomGrid: FC<Props> = ({ items }) => {
	return (
		<GridWrapper>
			<GridContainer>
				{items.map((item) => (
					<GridItem
						key={item.title}
						src={item.image}
						title={item.title}
						category={item.category}
						slug={item.slug}
					/>
				))}
			</GridContainer>
		</GridWrapper>
	);
};

export default memo(CustomGrid);

const GridWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 1.75rem;
`;

const GridContainer = styled.div`
	width: 100%;
	max-width: var(--max-width1250);
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 2rem;

	@media (max-width: 992px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (max-width: 680px) {
		grid-template-columns: 1fr;
	}
`;
