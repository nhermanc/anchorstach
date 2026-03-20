/** @format */

import { sendGTMEvent } from "@next/third-parties/google";
import { FC } from "react";

/**
 * Example: fires `signup_click` on the GTM dataLayer (use with GTM triggers).
 * Import this component on any page or inside a real CTA — not mounted globally.
 */
const GtmSignupClickExample: FC = () => {
	return (
		<button
			type='button'
			onClick={() => {
				sendGTMEvent({ event: "signup_click" });
			}}>
			Example: signup_click (GTM)
		</button>
	);
};

export default GtmSignupClickExample;
