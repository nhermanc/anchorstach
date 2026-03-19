import type { NextApiRequest, NextApiResponse } from "next";

const UPWORK_PROFILE_URL = "https://www.upwork.com/freelancers/nelsonh5";

type TestimonialItem = {
	id: string;
	serviceTitle: string;
	review: string;
	reviewerName: string;
	reviewerRole: string;
	reviewerAvatar: string;
	rating: number;
	backgroundImage: string;
};

function extractTestimonialsFromHtml(html: string): TestimonialItem[] {
	const testimonials: TestimonialItem[] = [];
	const backgrounds = [
		"/home/home2.jpg",
		"/home/home1.jpg",
		"/services/services10.jpg",
		"/home/work4.jpg",
	];

	try {
		// Try to find JSON data in script tags (common in SPAs)
		const scriptMatch = html.match(
			/<script[^>]*id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i,
		);
		if (scriptMatch) {
			try {
				const data = JSON.parse(scriptMatch[1]);
				const pageProps = data?.props?.pageProps;
				if (pageProps) {
					const feedback =
						pageProps?.profile?.feedback ||
						pageProps?.feedback ||
						pageProps?.workHistory ||
						[];
					if (Array.isArray(feedback)) {
						feedback.slice(0, 6).forEach((item: any, i: number) => {
							const comment =
								item?.comment ||
								item?.feedback ||
								item?.commentText ||
								item?.comment_text ||
								"";
							const name =
								item?.client?.name ||
								item?.clientName ||
								item?.buyer?.name ||
								"Client";
							const title =
								item?.job?.title ||
								item?.jobTitle ||
								item?.project?.title ||
								"Project";
							const rating =
								item?.rating ||
								item?.score ||
								item?.overall_rating ||
								5;
							if (comment && comment.length > 20) {
								testimonials.push({
									id: `upwork-${i}`,
									serviceTitle: title,
									review: comment,
									reviewerName: name,
									reviewerRole: title,
									reviewerAvatar: "/home/user.png",
									rating: typeof rating === "number" ? rating : 5,
									backgroundImage: backgrounds[i % backgrounds.length],
								});
							}
						});
					}
				}
			} catch (_) {}
		}

		// Try __APOLLO_STATE__ or similar
		const apolloMatch = html.match(
			/window\.__APOLLO_STATE__\s*=\s*({[\s\S]*?});/,
		);
		if (apolloMatch && testimonials.length === 0) {
			try {
				const state = JSON.parse(apolloMatch[1]);
				const keys = Object.keys(state).filter((k) =>
					k.toLowerCase().includes("feedback"),
				);
				keys.slice(0, 6).forEach((key, i) => {
					const item = state[key];
					if (item?.comment) {
						testimonials.push({
							id: `upwork-${i}`,
							serviceTitle: item.job?.title || "Project",
							review: item.comment,
							reviewerName: item.client?.name || "Client",
							reviewerRole: item.job?.title || "Client",
							reviewerAvatar: "/home/user.png",
							rating: item.rating || 5,
							backgroundImage: backgrounds[i % backgrounds.length],
						});
					}
				});
			} catch (_) {}
		}

		// Try cheerio for HTML parsing if available
		if (testimonials.length === 0) {
			try {
				const cheerio = require("cheerio");
				const $ = cheerio.load(html);

				$("[data-test='feedback'], [data-testid='feedback'], .feedback-item, .work-history-item, [class*='feedback'], [class*='review']").each(
					(i: number, el: any) => {
						if (i >= 6) return;
						const $el = $(el);
						const comment =
							$el.find("[data-test='comment'], .comment, p").first().text().trim() ||
							$el.text().trim();
						const name =
							$el.find("[data-test='client-name'], .client-name, strong").first().text().trim() ||
							"Client";
						if (comment && comment.length > 30) {
							testimonials.push({
								id: `upwork-${i}`,
								serviceTitle: "Project",
								review: comment.substring(0, 500),
								reviewerName: name || "Client",
								reviewerRole: "Upwork Client",
								reviewerAvatar: "/home/user.png",
								rating: 5,
								backgroundImage: backgrounds[i % backgrounds.length],
							});
						}
					},
				);
			} catch (_) {
				// cheerio not available or parse failed
			}
		}
	} catch (err) {
		console.error("Upwork parse error:", err);
	}

	return testimonials;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed." });
	}

	try {
		const response = await fetch(UPWORK_PROFILE_URL, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
				Accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
				"Accept-Language": "en-US,en;q=0.9",
			},
		});

		if (!response.ok) {
			return res.status(200).json({
				testimonials: [],
				source: "fallback",
				message: "Upwork profile could not be fetched. Using static data.",
			});
		}

		const html = await response.text();
		const testimonials = extractTestimonialsFromHtml(html);

		return res.status(200).json({
			testimonials,
			source: testimonials.length > 0 ? "upwork" : "fallback",
		});
	} catch (error) {
		console.error("Upwork testimonials fetch error:", error);
		return res.status(200).json({
			testimonials: [],
			source: "fallback",
			message: "Failed to fetch Upwork data. Using static testimonials.",
		});
	}
}
