/** @format */

/** Default Web3Forms access key (override with WEB3FORMS_ACCESS_KEY or NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY). */
export const DEFAULT_WEB3FORMS_ACCESS_KEY =
	"c12c2493-5c4f-4314-b892-e77d3d6baeeb";

export function resolveWeb3FormsAccessKey(): string {
	return (
		process.env.WEB3FORMS_ACCESS_KEY?.trim() ||
		process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ||
		DEFAULT_WEB3FORMS_ACCESS_KEY
	);
}
