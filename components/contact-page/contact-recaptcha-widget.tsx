/** @format */

import { forwardRef, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { getContactRecaptchaSiteKey } from "../../lib/contact-recaptcha";

const ContactRecaptchaWidget = forwardRef<ReCAPTCHA, object>(
	function ContactRecaptchaWidget(_props, ref) {
		const [mounted, setMounted] = useState(false);
		const siteKey = getContactRecaptchaSiteKey();

		useEffect(() => {
			setMounted(true);
		}, []);

		if (!siteKey || !mounted) {
			return null;
		}

		return (
			<ReCAPTCHA
				ref={ref}
				sitekey={siteKey}
				size='normal'
				hl='en'
			/>
		);
	},
);

export default ContactRecaptchaWidget;
