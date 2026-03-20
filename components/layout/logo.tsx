/** @format */

import styled from "styled-components";
import Image from "next/image";
import React, { memo } from "react";
import { companyInfo } from "../../app/company-data";

type Props = {
	visible?: boolean;
	isTransparent?: boolean;
	burgerMenuStatus?: boolean;
	SetBurgerMenuStatus?: (e: boolean) => void;
};

const Logo: React.FC<Props> = ({ isTransparent, visible }) => {
	return (
		<Wrapper isTransparent={isTransparent} visible={visible}>
			<div
				className='logo'
				style={{
					position: "relative",
					cursor: "pointer",
				}}>
				<Image
					className='logo-img'
					src={companyInfo.logoPath}
					alt={`${companyInfo.name} logo`}
					layout='fill'
					objectFit='contain'
				/>
			</div>
			<div className='brand-name'>{companyInfo.name}</div>
		</Wrapper>
	);
};

export default memo(Logo);

const Wrapper = styled.div<Props>`
	height: 6rem;
	color: #0f0b33;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	flex: 0 1 auto;
	min-width: 0;
	max-width: min(100%, 22rem);
	@media (min-width: 1200px) {
		max-width: none;
	}
	text-transform: uppercase;
	font-weight: bold;
	position: relative;
	z-index: 2;
	isolation: isolate;

	.logo {
		flex-shrink: 0;
		width: 3.825rem;
		height: 2.237rem;
		min-width: 3.825rem;
		display: flex;
		align-items: center;
		img {
			display: block;
		}
	}

	.brand-name {
		font-weight: 600;
		font-size: clamp(0.7rem, 0.55rem + 1.1vw, 1.5rem);
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: ${(props) =>
			props.isTransparent && !props.visible ? `#0f0b33` : `#0f0b33`};
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		@media (max-width: 380px) {
			max-width: 9rem;
		}
	}
`;
