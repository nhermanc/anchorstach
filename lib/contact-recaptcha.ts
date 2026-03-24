/** @format */

export function getContactRecaptchaSiteKey(): string {
	return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() || "";
}

export function isContactRecaptchaEnabled(): boolean {
	return Boolean(getContactRecaptchaSiteKey());
}
