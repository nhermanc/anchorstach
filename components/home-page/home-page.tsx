/** @format */

import dynamic from "next/dynamic";
import React, { FC } from "react";

import Hero from "./hero";
import MainNavigation from "../layout/main-navigation";
import HomeSectionPlaceholder from "./home-section-placeholder";

const Services = dynamic(() => import("./services"), {
	loading: () => (
		<HomeSectionPlaceholder minHeight="36rem" aria-label="Loading services" />
	),
	ssr: true,
});

const StrategicPartner = dynamic(() => import("./strategic-partner"), {
	loading: () => (
		<HomeSectionPlaceholder minHeight="22rem" aria-label="Loading partner" />
	),
	ssr: true,
});

const AboutUsCom = dynamic(() => import("./about-us"), {
	loading: () => (
		<HomeSectionPlaceholder minHeight="28rem" aria-label="Loading about section" />
	),
	ssr: true,
});

const Work = dynamic(() => import("./work"), {
	loading: () => (
		<HomeSectionPlaceholder minHeight="32rem" aria-label="Loading work section" />
	),
	ssr: true,
});

const BlogTeaser = dynamic(() => import("./blog-teaser"), {
	loading: () => (
		<HomeSectionPlaceholder minHeight="28rem" aria-label="Loading blog highlights" />
	),
	ssr: true,
});

const TESTIMONIAL = dynamic(() => import("./testimonial"), {
	loading: () => (
		<HomeSectionPlaceholder minHeight="26rem" aria-label="Loading testimonials" />
	),
	ssr: true,
});

const HomePageComponent: FC = () => {
	return (
		<React.Fragment>
			<MainNavigation />
			<Hero />
			<Services />
			<StrategicPartner />
			<AboutUsCom />
			<Work />
			<BlogTeaser />
			<TESTIMONIAL />
		</React.Fragment>
	);
};

export default HomePageComponent;
