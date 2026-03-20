/** @format */

/** Shared shape for contact + hire-us submissions to `/api/contact`. */
export type ContactApiPayload = {
	name: string;
	email: string;
	/** Message body (contact “subject” field maps here). */
	message: string;
	/** Optional SMTP subject line; defaults server-side if omitted. */
	emailSubject?: string;
};
