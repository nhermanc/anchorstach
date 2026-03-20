/** @format */
import styled from "styled-components";

/** Lightweight placeholder while below-the-fold homepage chunks load (no animation = less main-thread work). */
const Shell = styled.div<{ $minHeight: string }>`
	min-height: ${(p) => p.$minHeight};
	width: 100%;
	background: #eef2f7;
`;

type Props = {
	minHeight?: string;
	"aria-label"?: string;
};

export default function HomeSectionPlaceholder({
	minHeight = "22rem",
	"aria-label": ariaLabel = "Loading section",
}: Props) {
	return <Shell $minHeight={minHeight} aria-label={ariaLabel} role="status" />;
}
