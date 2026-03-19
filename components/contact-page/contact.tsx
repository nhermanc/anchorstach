/** @format */

import React, { FC, Fragment, memo } from "react";

import ContactFormComponent from "./contact-form";
import ContactLanding from "./contact-landing";
import MainNavigation from "../layout/main-navigation";

const ContactComponent: FC = () => {
	return (
		<React.Fragment>
			<MainNavigation />
			{/* <ContactLanding /> */}
			<ContactFormComponent />
		</React.Fragment>
	);
};

export default memo(ContactComponent);
