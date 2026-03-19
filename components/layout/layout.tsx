/** @format */

import React, { Fragment } from "react";
import dynamic from "next/dynamic";

import Footer from "./footer";

const ScrollToTopComponent = dynamic(() => import("./scroll-to-top"), {
	ssr: false,
});

type LayoutProps = {
	children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = (props) => {
	return (
		<Fragment>
			<main>{props.children}</main>
			<Footer />
			<ScrollToTopComponent />
		</Fragment>
	);
};

export default Layout;
