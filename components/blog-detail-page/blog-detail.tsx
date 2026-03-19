/** @format */

import React, { FC, memo, useMemo } from "react";
import { useRouter } from "next/router";

import BlogArticle1 from "./blog-article1";
import BlogArticle2 from "./blog-article2";
import BlogLanding from "./blog-landing";
import MainNavigation from "../layout/main-navigation";
import { blogItems } from "../../app/company-data";

const BlogDetailComponent: FC = () => {
	const router = useRouter();
	const blogQuery = typeof router.query.blog === "string" ? router.query.blog : "";
	const selectedBlog = useMemo(
		() => blogItems.find((item) => item.id === blogQuery) || blogItems[0],
		[blogQuery],
	);

	return (
		<React.Fragment>
			<MainNavigation />
			<BlogLanding blogItem={selectedBlog} />
			<BlogArticle1 blogItem={selectedBlog} />
			<BlogArticle2 currentBlogId={selectedBlog.id} />
		</React.Fragment>
	);
};

export default memo(BlogDetailComponent);
