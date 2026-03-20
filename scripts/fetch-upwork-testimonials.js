/**
 * Standalone script to fetch Upwork testimonials.
 * Run: node scripts/fetch-upwork-testimonials.js
 *
 * If the API fails (Upwork may block automated requests), you can:
 * 1. Manually copy reviews from https://www.upwork.com/freelancers/nelsonh5
 * 2. Add them to app/company-data.ts in testimonialItems array
 */

const PROFILE_URL = "https://www.upwork.com/freelancers/nelsonh5";

async function fetchTestimonials() {
	try {
		const res = await fetch(PROFILE_URL, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
				Accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
				"Accept-Language": "en-US,en;q=0.9",
			},
		});

		const html = await res.text();

		// Try __NEXT_DATA__
		const nextDataMatch = html.match(
			/<script[^>]*id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i,
		);
		if (nextDataMatch) {
			const data = JSON.parse(nextDataMatch[1]);
			const feedback =
				data?.props?.pageProps?.profile?.feedback ||
				data?.props?.pageProps?.feedback ||
				[];
			if (Array.isArray(feedback) && feedback.length > 0) {
				const backgrounds = [
					"/home/home2.webp",
					"/home/home1.webp",
					"/services/services10.jpg",
					"/home/work4.jpg",
				];
				const testimonials = feedback.slice(0, 6).map((item, i) => ({
					id: `upwork-${i}`,
					serviceTitle: item.job?.title || item.jobTitle || "Project",
					review: item.comment || item.feedback || "",
					reviewerName: item.client?.name || item.clientName || "Client",
					reviewerRole: item.job?.title || "Upwork Client",
					reviewerAvatar: "/home/user.webp",
					rating: item.rating || item.score || 5,
					backgroundImage: backgrounds[i % backgrounds.length],
				}));
				console.log(JSON.stringify(testimonials, null, 2));
				return;
			}
		}

		console.error(
			"Could not extract testimonials from Upwork page. The page may use client-side rendering or block automated requests.",
		);
		console.log(
			"\nTo add testimonials manually:\n1. Visit",
			PROFILE_URL,
			"\n2. Copy the review text, client name, and project title\n3. Add to testimonialItems in app/company-data.ts",
		);
	} catch (err) {
		console.error("Fetch error:", err.message);
	}
}

fetchTestimonials();
