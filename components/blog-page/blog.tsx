/** @format */

import React, { memo, useMemo, useState } from "react";

import AllBlog from "./all-blog";
import Welcoming from "./welcoming";
import MainNavigation from "../layout/main-navigation";
import { blogItems, blogCategoryItems } from "../../app/company-data";

const BlogComponent: React.FC = () => {
	const [activeCategory, setActiveCategory] = useState<string>("All");
	const [searchValue, setSearchValue] = useState<string>("");

	const filteredItems = useMemo(() => {
		const lowerSearch = searchValue.trim().toLowerCase();

		return blogItems.filter((item) => {
			const categoryMatches =
				activeCategory === "All" || item.category === activeCategory;
			const searchMatches =
				!lowerSearch ||
				item.title.toLowerCase().includes(lowerSearch) ||
				item.authorName.toLowerCase().includes(lowerSearch) ||
				item.category.toLowerCase().includes(lowerSearch);
			return categoryMatches && searchMatches;
		});
	}, [activeCategory, searchValue]);

	return (
		<React.Fragment>
			<MainNavigation />
			<Welcoming />
			<AllBlog
				items={filteredItems}
				activeCategory={activeCategory}
				onCategoryChange={setActiveCategory}
				searchValue={searchValue}
				onSearchChange={setSearchValue}
				categoryItems={blogCategoryItems}
			/>
		</React.Fragment>
	);
};

export default memo(BlogComponent);
