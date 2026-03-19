/** @format */

import React, { Fragment } from "react";
import Head from "next/head";
import type { NextPage } from "next";

import BlogDetailComponent from "../components/blog-detail-page/blog-detail";

const HirUsPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Blog Article | AnchorStackTech</title>
				<meta
					name="description"
					content="Read insights on software development, design, and technology from the AnchorStackTech team."
				/>
			</Head>

			<BlogDetailComponent />
		</React.Fragment>
	);
};

export default HirUsPage;
