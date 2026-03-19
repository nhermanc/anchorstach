/**
 * Fetch Upwork testimonials using Puppeteer (headless browser).
 * Run: npm run fetch-upwork:puppeteer
 *
 * Requires: npm install puppeteer --save-dev --legacy-peer-deps
 */

const PROFILE_URL = "https://www.upwork.com/freelancers/nelsonh5";

async function fetchWithPuppeteer() {
	let puppeteer;
	try {
		puppeteer = require("puppeteer");
	} catch (e) {
		console.error(
			"Puppeteer not installed. Run: npm install puppeteer --save-dev --legacy-peer-deps",
		);
		process.exit(1);
	}

	const fs = require("fs");
	const path = require("path");
	const chromiumPaths = [
		"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
		"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
		path.join(process.env.LOCALAPPDATA || "", "Google", "Chrome", "Application", "chrome.exe"),
		"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
	];
	let executablePath = chromiumPaths.find((p) => p && fs.existsSync(p));

	const browser = await puppeteer.launch({
		headless: true,
		executablePath: executablePath || undefined,
		args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
	});

	try {
		const page = await browser.newPage();
		await page.setUserAgent(
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
		);
		await page.setViewport({ width: 1280, height: 800 });

		console.log("Loading Upwork profile...");
		await page.goto(PROFILE_URL, {
			waitUntil: "networkidle2",
			timeout: 30000,
		});

		// Wait for feedback/reviews section to load
		await new Promise((r) => setTimeout(r, 5000));

		// Try to extract from __NEXT_DATA__ in the page
		const testimonials = await page.evaluate(() => {
			const script = document.getElementById("__NEXT_DATA__");
			if (!script || !script.textContent) return [];
			try {
				const data = JSON.parse(script.textContent);
				const props = data?.props?.pageProps || {};
				const feedback =
					props?.profile?.feedback ||
					props?.feedback ||
					props?.workHistory ||
					[];
				if (!Array.isArray(feedback)) return [];

				const backgrounds = [
					"/home/home2.jpg",
					"/home/home1.jpg",
					"/services/services10.jpg",
					"/home/work4.jpg",
				];

				return feedback.slice(0, 6).map((item, i) => {
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
						"C";
					const title =
						item?.job?.title ||
						item?.jobTitle ||
						item?.project?.title ||
						"Project";
					const rating = item?.rating || item?.score || 5;
					return {
						id: `upwork-${i}`,
						serviceTitle: title,
						review: comment,
						reviewerName: name,
						reviewerRole: title,
						reviewerAvatar: "/home/user.png",
						rating: typeof rating === "number" ? rating : 5,
						backgroundImage: backgrounds[i % backgrounds.length],
					};
				});
			} catch (e) {
				return [];
			}
		});

		// If __NEXT_DATA__ didn't work, try scraping visible DOM
		let extracted = testimonials.filter((t) => t.review && t.review.length > 20);
		if (extracted.length === 0) {
			extracted = await page.evaluate(() => {
				const items = [];
				const sections = document.querySelectorAll(
					"[data-test='WorkHistoryFeedback'], [data-testid='feedback'], [class*='WorkHistory'], [class*='feedback']",
				);
				sections.forEach((section, i) => {
					if (i >= 6) return;
					const text = section.innerText || section.textContent || "";
					const lines = text.split("\n").filter((l) => l.trim());
					if (lines.length >= 2) {
						const review = lines.slice(1).join(" ").trim().substring(0, 500);
						if (review.length > 30) {
							items.push({
								id: `upwork-${i}`,
								serviceTitle: lines[0] || "Project",
								review,
								reviewerName: lines[0] || "Client",
								reviewerRole: "Upwork Client",
								reviewerAvatar: "/home/user.png",
								rating: 5,
								backgroundImage:
									["/home/home2.jpg", "/home/home1.jpg", "/services/services10.jpg", "/home/work4.jpg"][
										i % 4
									],
							});
						}
					}
				});
				return items;
			});
		}

		await browser.close();

		if (extracted.length > 0) {
			console.log(JSON.stringify(extracted, null, 2));
			return extracted;
		}
	} catch (err) {
		console.error("Error:", err.message);
		await browser.close();
	}

	console.error("Could not extract testimonials. Upwork may require login or block automation.");
	console.log("\nManual option: Visit", PROFILE_URL, "and copy reviews to app/company-data.ts");
	process.exit(1);
}

fetchWithPuppeteer();
