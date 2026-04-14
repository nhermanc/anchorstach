export const companyInfo = {
	name: "AnchorStackTech",
	tagline: "Custom Software Development Company in Chicago",
	email: "hello@anchorstacktech.com",
	phone: "+1 (312) 259-5011",
	/** Use for `tel:` links and structured data (Google Voice). */
	phoneTel: "+13122595011",
	address: "6550 N. Damen Ave. Apartment 107, Chicago, IL 60645",
	city: "Chicago",
	state: "IL",
	zip: "60645",
	country: "US",
	/** Same location as Fischer Software Company on Google Maps (suite / office). */
	officeMapOpenUrl:
		"https://www.google.com/maps/place/Fischer+Software+Company/@42.0010258,-87.6805104,17z/data=!3m1!4b1!4m6!3m5!1s0x880fd1aa0713cb89:0xb0869c93b7307314!8m2!3d42.0010258!4d-87.6805104!16s%2Fg%2F11z2jdj0pg?entry=ttu",
	officeMapEmbedUrl:
		"https://maps.google.com/maps?q=42.0010258,-87.6805104&z=17&hl=en&output=embed",
	logoPath: "/logo/anchorstacktech-logo.svg",
	faviconPath: "/favicon.svg",
	liveChatUrl: "https://wa.me/13122595011",
	googleCalendarBookingUrl:
		"https://calendar.google.com/calendar/u/0/r/eventedit?text=Meeting%20with%20AnchorStackTech&details=Please%20share%20your%20project%20goals%20and%20timeline.",
	siteUrl:
		process.env.NEXT_PUBLIC_SITE_URL || "https://anchorstacktech.com",
	seoDescription:
		"AnchorStackTech is a Chicago-based software development company specializing in custom web development, mobile apps, Odoo ERP, blockchain solutions, AI integration, and desktop applications. Get a free consultation today.",
	seoKeywords:
		"AnchorStackTech, software development company Chicago, Chicago software developers, custom software development, web development Chicago, web application development, responsive website design, mobile app development, iOS development, Android development, cross-platform apps, Odoo ERP, Odoo customization, ERP implementation, business automation, blockchain development, smart contracts, AI integration, machine learning solutions, desktop software, full stack development, API development, cloud applications, SaaS development, IT consulting Chicago, Illinois software company, enterprise software, startup development, offshore development team, hire developers, software agency USA",
};

/**
 * Strategic partner — surfaced on the homepage and footer. Opens in a new tab.
 * @see https://www.linka.ai/
 */
export const strategicPartner = {
	name: "Linka AI",
	url: "https://www.linka.ai/",
	tagline: "Custom AI sales agents for websites, social, and messaging",
	intro:
		"We are proud to partner with Linka AI—a platform that helps businesses launch personalized AI agents trained on their content to answer questions, capture leads, and drive sales across their website and social channels.",
	bullets: [
		"Deploy agents where buyers already are: your site, link-in-bio, DMs, and more.",
		"Ground responses in your real pages, products, and FAQs so answers stay accurate and on-brand.",
		"Connect to the tools you already use and turn conversations into qualified leads and revenue.",
	],
	ctaLabel: "Explore Linka AI",
};

export type ServiceItem = {
	title: string;
	slug: string;
	description: string;
	detailHeading: string;
	detailDescription: string;
	heroImage: string;
	highlights: string[];
	deliverables: string[];
};

export const serviceItems: ServiceItem[] = [
	{
		title: "Web Solutions",
		slug: "web-solutions",
		description:
			"Modern websites and web platforms built for performance, usability, SEO, and long-term scalability.",
		detailHeading: "Modern web platforms built for performance and growth",
		detailDescription:
			"We design and deliver conversion-focused websites, customer portals, and web applications with scalable architecture, fast load times, and search-friendly structure.",
		heroImage: "/home/work1.webp",
		highlights: [
			"High-performance websites and web applications",
			"SEO-ready architecture, metadata, and content structure",
			"Responsive UX across desktop, tablet, and mobile",
			"Scalable frontend and backend integration patterns",
		],
		deliverables: [
			"Discovery workshops and technical scope definition",
			"UI/UX wireframes, visual design, and design system alignment",
			"Frontend/backend implementation with QA validation",
			"Production deployment, monitoring, and optimization roadmap",
		],
	},
	{
		title: "Mobile App Solutions",
		slug: "mobile-app-solutions",
		description:
			"iOS and Android applications designed for smooth user experience, reliable performance, and business growth.",
		detailHeading:
			"Business-ready iOS and Android apps with smooth user experiences",
		detailDescription:
			"We build mobile products that combine clean UX, stable architecture, and measurable product outcomes from MVP to full-scale release.",
		heroImage: "/home/work2.webp",
		highlights: [
			"Native-like performance across iOS and Android",
			"Secure API integration and offline-capable app flows",
			"Analytics events and retention-focused product tracking",
			"Scalable architecture for future feature expansion",
		],
		deliverables: [
			"Product strategy, app flow mapping, and prototyping",
			"UI implementation, backend integration, and QA testing",
			"App Store / Play Store preparation and release support",
			"Post-launch iteration plan based on analytics insights",
		],
	},
	{
		title: "ERP & Business Systems",
		slug: "erp-business-systems",
		description:
			"Odoo customization, ERP implementation, and workflow automation to streamline daily operations and internal processes.",
		detailHeading: "ERP and Odoo solutions tailored to your internal operations",
		detailDescription:
			"We align ERP systems with your workflows so sales, finance, inventory, HR, and operations work together in one reliable platform.",
		heroImage: "/services/services10.jpg",
		highlights: [
			"Odoo module customization based on business requirements",
			"ERP implementation and process automation rollout",
			"Data migration and integration with existing systems",
			"Operational dashboards and role-based access control",
		],
		deliverables: [
			"Current-state process audit and solution blueprint",
			"ERP configuration, custom module development, and integration",
			"User training, documentation, and go-live support",
			"Stabilization plan for performance and process accuracy",
		],
	},
	{
		title: "Blockchain Solutions",
		slug: "blockchain-solutions",
		description:
			"Secure blockchain applications, smart contract integrations, and transparent digital systems for trusted transactions and workflows.",
		detailHeading: "Secure blockchain systems for trusted digital workflows",
		detailDescription:
			"We build blockchain-powered platforms with secure smart contracts and transparent records for processes that require trust, auditability, and integrity.",
		heroImage: "/home/work3.jpg",
		highlights: [
			"Smart contract architecture with security-first practices",
			"Transparent transaction and record-tracking systems",
			"Wallet, identity, and integration-ready blockchain workflows",
			"Use-case validation to avoid unnecessary complexity",
		],
		deliverables: [
			"Blockchain feasibility analysis and technical architecture",
			"Smart contract development, testing, and integration",
			"Deployment strategy with governance recommendations",
			"Documentation for operations and future scalability",
		],
	},
	{
		title: "AI Solutions",
		slug: "ai-solutions",
		description:
			"AI-powered tools, automations, and intelligent features that improve efficiency, insights, and customer experience.",
		detailHeading: "AI-powered features that deliver practical business value",
		detailDescription:
			"We integrate AI into products and operations to reduce manual effort, improve decision quality, and deliver faster customer responses.",
		heroImage: "/home/work4.jpg",
		highlights: [
			"AI assistants for support, search, and content workflows",
			"Process automation with validation and approval checkpoints",
			"Data-driven insights and intelligent recommendation engines",
			"Responsible AI setup with quality and performance monitoring",
		],
		deliverables: [
			"AI opportunity mapping and implementation roadmap",
			"Model/tool integration with your existing systems",
			"Evaluation metrics, monitoring, and optimization plan",
			"Team enablement for long-term AI adoption",
		],
	},
	{
		title: "Desktop Software",
		slug: "desktop-software",
		description:
			"Reliable desktop applications for internal tools, business operations, and offline-capable working environments.",
		detailHeading: "Reliable desktop software for business-critical workflows",
		detailDescription:
			"We deliver secure and maintainable desktop applications for teams that need strong performance, controlled environments, and stable offline-first workflows.",
		heroImage: "/home/work5.jpg",
		highlights: [
			"Desktop tools for internal operations and process control",
			"Offline-capable architecture with sync support",
			"Secure access management and audit-friendly logging",
			"Stable UX for high-frequency business tasks",
		],
		deliverables: [
			"Desktop architecture planning and implementation strategy",
			"Feature development, testing, and environment hardening",
			"Installer/packaging setup and rollout guidance",
			"Maintenance plan for updates, reliability, and support",
		],
	},
];

export const homeProjectItems = [
	{
		title: "Anchor CRM Dashboard",
		slug: "anchor-crm-dashboard",
		category: "Web Solutions",
		image: "/home/work1.webp",
	},
	{
		title: "FleetOps Mobile App",
		slug: "fleetops-mobile-app",
		category: "App Development",
		image: "/home/work2.webp",
	},
	{
		title: "Retail ERP Odoo Suite",
		slug: "retail-erp-odoo-suite",
		category: "ERP & Business Systems",
		image: "/home/work3.jpg",
	},
];

export type WorkProjectItem = {
	title: string;
	slug: string;
	category: string;
	image: string;
	projectType: string;
	overview: string;
	highlights: string[];
	liveLink?: string;
	platformLinks?: {
		web?: string;
		ios?: string;
		android?: string;
	};
};

export const workProjectItems: WorkProjectItem[] = [
	{
		title: "LightOn AI",
		slug: "lighton-ai",
		category: "Web Development",
		image: "/home/work1.webp",
		projectType: "Webflow Website",
		liveLink: "https://www.lighton.ai/",
		overview:
			"A Webflow marketing website for an enterprise AI platform focused on secure search, RAG workflows, and private infrastructure deployment.",
		highlights: [
			"Conversion-focused product storytelling for B2B buyers",
			"Responsive CMS-driven page structure with polished UI sections",
			"Fast front-end experience built for clarity and trust",
		],
	},
	{
		title: "Pantera Technology",
		slug: "pantera-technology",
		category: "Web Development",
		image: "/home/work2.webp",
		projectType: "Webflow Website",
		liveLink: "https://www.panteratechnology.com/",
		overview:
			"A modern Webflow product website for a real-estate deal modeling platform covering investment, development, and data workflows.",
		highlights: [
			"Clear SaaS positioning for property and investment audiences",
			"Structured landing pages for product modules and demos",
			"Responsive layout optimized for lead generation",
		],
	},
	{
		title: "6lock",
		slug: "6lock",
		category: "Web Development",
		image: "/home/work3.jpg",
		projectType: "Webflow Website",
		liveLink: "https://www.6lock.com/",
		overview:
			"A conversion-focused Webflow website for a secure money-movement platform serving private equity operations and finance teams.",
		highlights: [
			"Trust-led messaging for finance and compliance-heavy buyers",
			"Product-first layout with strong demo and CTA flow",
			"Responsive sections supporting credibility and adoption",
		],
	},
	{
		title: "Gradito",
		slug: "gradito",
		category: "Web Development",
		image: "/home/work4.jpg",
		projectType: "Webflow Website",
		liveLink: "https://www.gradito.com/",
		overview:
			"A premium lifestyle and marketplace website for private-chef bookings, curated dining experiences, and event reservations.",
		highlights: [
			"Elegant visual storytelling for premium consumer services",
			"Responsive event and reservation-oriented user journeys",
			"Brand-focused presentation designed to elevate trust and desire",
		],
	},
	{
		title: "SketchPro AI",
		slug: "sketchpro-ai",
		category: "Web Development",
		image: "/home/work5.jpg",
		projectType: "Next.js Website",
		liveLink: "https://sketchpro.ai/",
		overview:
			"A Next.js product website for an AI copilot that helps architects and design teams automate Revit documentation workflows.",
		highlights: [
			"Component-based front-end built for product clarity",
			"Performance-focused rendering for modern SaaS presentation",
			"Responsive UX supporting demos, pilots, and conversion",
		],
	},
	{
		title: "Zora Eco",
		slug: "zora-eco",
		category: "Web Development",
		image: "/services/services10.jpg",
		projectType: "Next.js Website",
		liveLink: "https://www.zora.eco/",
		overview:
			"A modern environmental platform website connecting landowners, corporates, investors, and communities around ecosystem regeneration.",
		highlights: [
			"Scalable front-end architecture for content-rich pages",
			"Mission-led storytelling with clean interaction design",
			"Responsive experience built for credibility and outreach",
		],
	},
	{
		title: "Zello",
		slug: "zello",
		category: "Web Development",
		image: "/home/work1.webp",
		projectType: "Next.js Website",
		liveLink: "https://zello.com/",
		overview:
			"A high-performance product website for a frontline communication platform focused on push-to-talk workflows, AI, and enterprise operations.",
		highlights: [
			"Fast product-led experience for large-scale SaaS messaging",
			"Responsive UI supporting feature discovery and demos",
			"Clear information architecture for enterprise audiences",
		],
	},
	{
		title: "Trilogy Energy Solutions",
		slug: "trilogy-energy-solutions",
		category: "Web Development",
		image: "/home/work2.webp",
		projectType: "Next.js Website",
		liveLink: "https://trilogyes.com/",
		overview:
			"A sector-focused website for an integrated energy software business serving operational and reporting needs in complex environments.",
		highlights: [
			"Structured corporate messaging for B2B software buyers",
			"Scalable page architecture for product and solution content",
			"Responsive design aligned to trust and lead generation",
		],
	},
	{
		title: "Skill Ferry",
		slug: "skill-ferry",
		category: "Web Development",
		image: "/home/work3.jpg",
		projectType: "Next.js Website",
		liveLink: "https://skillferry.com/",
		overview:
			"A lead-generation website for a remote tech hiring and managed staffing business focused on cost-efficient talent acquisition.",
		highlights: [
			"Conversion-oriented messaging for recruitment services",
			"Performance-focused pages with clear CTA hierarchy",
			"Responsive design built for credibility and inquiries",
		],
	},
	{
		title: "Hitabs",
		slug: "hitabs",
		category: "Web Development",
		image: "/home/work4.jpg",
		projectType: "Nuxt.js Website",
		liveLink: "https://hitabs.com/",
		overview:
			"A concise product website for a link-management tool built around saving, organizing, grouping, and sharing online resources.",
		highlights: [
			"Lightweight product presentation with focused messaging",
			"Responsive front-end for a simple SaaS experience",
			"Clean structure designed for fast comprehension",
		],
	},
	{
		title: "Curapath",
		slug: "curapath",
		category: "Web Development",
		image: "/home/work5.jpg",
		projectType: "WordPress Website",
		liveLink: "https://curapath.com/",
		overview:
			"A corporate WordPress website for a global CDMO specializing in drug-delivery systems, manufacturing support, and technical expertise.",
		highlights: [
			"Flexible CMS for ongoing content and resource updates",
			"Responsive enterprise design for trust and credibility",
			"Service-led information architecture for technical buyers",
		],
	},
	{
		title: "Velocity Medtech",
		slug: "velocity-medtech",
		category: "Web Development",
		image: "/services/services10.jpg",
		projectType: "WordPress Website",
		liveLink: "https://velocitymedtech.com/",
		overview:
			"A professional healthcare and medtech website built to communicate innovation, capabilities, and partnership value.",
		highlights: [
			"Responsive B2B design for medical technology positioning",
			"CMS-driven content management for business growth",
			"Clear service and brand presentation for trust building",
		],
	},
	{
		title: "Resolution Medical",
		slug: "resolution-medical",
		category: "Web Development",
		image: "/home/work1.webp",
		projectType: "WordPress Website",
		liveLink: "https://resolutionmedical.com/",
		overview:
			"A WordPress corporate website for a medical solutions business with an emphasis on expertise, quality, and industry credibility.",
		highlights: [
			"Business-focused layout for capabilities and solutions",
			"Responsive CMS structure for internal content updates",
			"Professional UI supporting trust and lead generation",
		],
	},
	{
		title: "Material",
		slug: "material-inc",
		category: "Web Development",
		image: "/home/work2.webp",
		projectType: "WordPress Website",
		liveLink: "https://www.material.inc/",
		overview:
			"A brand-led WordPress website with a modern editorial feel designed to present services, thinking, and market positioning.",
		highlights: [
			"Flexible CMS setup for publishing and brand storytelling",
			"Responsive design with polished visual hierarchy",
			"Content-rich page structure for long-term scalability",
		],
	},
	{
		title: "Lura Health",
		slug: "lura-health",
		category: "Web Development",
		image: "/home/work3.jpg",
		projectType: "WordPress Website",
		liveLink: "https://lurahealth.com/",
		overview:
			"A health-tech website built to communicate product innovation, clinical relevance, and brand credibility in a clear way.",
		highlights: [
			"Professional product storytelling for healthcare audiences",
			"Responsive UI tailored to trust and education",
			"CMS-friendly structure for updates and thought leadership",
		],
	},
	{
		title: "Swiss Made Direct",
		slug: "swiss-made-direct",
		category: "Web Development",
		image: "/home/work4.jpg",
		projectType: "WordPress Website",
		liveLink: "https://swissmade.direct/",
		overview:
			"A premium WordPress eCommerce and brand website focused on curated Swiss-made products and polished product presentation.",
		highlights: [
			"Elegant storefront experience with strong brand identity",
			"Responsive catalog and content presentation",
			"CMS-driven structure supporting products and editorial pages",
		],
	},
	{
		title: "Flower Marketplace",
		slug: "flower-marketplace",
		category: "Web Development",
		image: "/home/work5.jpg",
		projectType: "WordPress Website",
		liveLink: "https://flowermarketplace.com/",
		overview:
			"A marketplace-style website built around floral products, vendor visibility, and a smooth browsing experience.",
		highlights: [
			"Responsive marketplace presentation for product discovery",
			"Business-friendly CMS structure for content updates",
			"Clear UX supporting browsing and conversion goals",
		],
	},
	{
		title: "Normandy Remodeling",
		slug: "normandy-remodeling",
		category: "Web Development",
		image: "/services/services10.jpg",
		projectType: "WordPress Website",
		liveLink: "https://normandyremodeling.com/",
		overview:
			"A home-remodeling website designed to showcase projects, services, and credibility for residential clients.",
		highlights: [
			"Visual portfolio sections for renovation-focused marketing",
			"Responsive lead-generation pages for local service demand",
			"CMS-backed project and testimonial management",
		],
	},
	{
		title: "Grand Design Build",
		slug: "grand-design-build",
		category: "Web Development",
		image: "/home/work1.webp",
		projectType: "WordPress Website",
		liveLink: "https://granddesignbuild.com/",
		overview:
			"A design-build company website focused on project presentation, service clarity, and residential client trust.",
		highlights: [
			"Portfolio-driven layout for design and build services",
			"Responsive pages supporting consultation conversion",
			"Flexible CMS for project updates and brand growth",
		],
	},
	{
		title: "Canyon Design Build",
		slug: "canyon-design-build",
		category: "Web Development",
		image: "/home/work2.webp",
		projectType: "WordPress Website",
		liveLink: "https://canyondesignbuild.com/",
		overview:
			"A WordPress service website for a design-build business, created to highlight craftsmanship, project quality, and client confidence.",
		highlights: [
			"Strong visual hierarchy for premium residential services",
			"Responsive project galleries and service pages",
			"CMS-managed content for long-term marketing flexibility",
		],
	},
	{
		title: "NextGen Roofing",
		slug: "nextgen-roofing",
		category: "Web Development",
		image: "/home/work3.jpg",
		projectType: "WordPress Website",
		liveLink: "https://nextgenroofing.com/",
		overview:
			"A service-driven roofing website built to present offerings clearly, capture inquiries, and strengthen local market trust.",
		highlights: [
			"Lead-generation structure for service-based conversion",
			"Responsive pages designed for accessibility and speed",
			"Easy content updates through a flexible CMS setup",
		],
	},
	{
		title: "MG Machinery",
		slug: "mg-machinery",
		category: "Web Development",
		image: "/home/work4.jpg",
		projectType: "WordPress Website",
		liveLink: "https://mgmachineryllc.com/",
		overview:
			"A WordPress business website for an industrial machinery company with clear service, product, and contact pathways.",
		highlights: [
			"Professional B2B layout for industrial credibility",
			"Responsive structure for product and service visibility",
			"CMS-based content management for long-term updates",
		],
	},
	{
		title: "Sortly",
		slug: "sortly",
		category: "Web Development",
		image: "/home/work5.jpg",
		projectType: "WordPress Website",
		liveLink: "https://www.sortly.com/",
		overview:
			"A product-led website for a software brand, designed around feature communication, trust building, and conversion.",
		highlights: [
			"SaaS-oriented layout for feature and use-case clarity",
			"Responsive front-end supporting growth marketing",
			"Scalable content structure for product storytelling",
		],
	},
	{
		title: "CB4",
		slug: "cb4",
		category: "Web Development",
		image: "/services/services10.jpg",
		projectType: "WordPress Website",
		liveLink: "https://cb4.com/",
		overview:
			"A polished corporate website for a technology business, focused on product messaging, market fit, and professional brand positioning.",
		highlights: [
			"Clean B2B page structure for complex product communication",
			"Responsive design supporting enterprise credibility",
			"CMS-driven layout for easy updates and publishing",
		],
	},
	{
		title: "Flex",
		slug: "get-flex",
		category: "Web Development",
		image: "/home/work1.webp",
		projectType: "WordPress Website",
		liveLink: "https://getflex.com/",
		overview:
			"A modern product website for a digital brand, designed with simplified messaging, conversion-first sections, and strong usability.",
		highlights: [
			"Clear page hierarchy for product and value communication",
			"Responsive UI for smooth multi-device browsing",
			"Flexible CMS supporting landing pages and updates",
		],
	},
	{
		title: "Giati Elements",
		slug: "giati-elements",
		category: "Web Development",
		image: "/home/work2.webp",
		projectType: "WordPress Website",
		liveLink: "https://giatielements.com/",
		overview:
			"A brand-focused website designed to showcase premium products, design quality, and a refined visual identity.",
		highlights: [
			"Product-centered layout with strong visual presentation",
			"Responsive experience supporting premium brand perception",
			"CMS-friendly structure for catalog and story updates",
		],
	},
	{
		title: "Walters Wicker",
		slug: "walters-wicker",
		category: "Web Development",
		image: "/home/work3.jpg",
		projectType: "WordPress Website",
		liveLink: "https://walterswicker.com/",
		overview:
			"A product and brand website built to present craftsmanship, collections, and a premium lifestyle-focused customer experience.",
		highlights: [
			"Elegant visual hierarchy for product-led storytelling",
			"Responsive pages tailored to browsing and discovery",
			"Flexible CMS for collections, content, and updates",
		],
	},
	{
		title: "Vogue Window Fashion",
		slug: "vogue-window-fashion",
		category: "Web Development",
		image: "/home/work4.jpg",
		projectType: "WordPress Website",
		liveLink: "https://voguewindowfashion.com/",
		overview:
			"A WordPress showroom website focused on interior product presentation, service communication, and lead generation.",
		highlights: [
			"Service and product sections designed for conversion",
			"Responsive layout supporting local business credibility",
			"CMS-managed content for marketing and portfolio updates",
		],
	},
	{
		title: "DDMinds",
		slug: "ddminds",
		category: "Web Development",
		image: "/home/work5.jpg",
		projectType: "WordPress Website",
		liveLink: "https://ddminds.com/",
		overview:
			"A technology consulting website created to communicate capabilities, expertise, and a strong professional brand presence.",
		highlights: [
			"Business-focused layout for services and case studies",
			"Responsive CMS experience built for long-term growth",
			"Clear messaging structure for lead generation",
		],
	},
	{
		title: "Product Labs AI",
		slug: "product-labs-ai",
		category: "Web Development",
		image: "/services/services10.jpg",
		projectType: "WordPress Website",
		liveLink: "https://www.productlabs.ai/",
		overview:
			"An AI product website designed to present innovation, consulting value, and a future-focused digital brand.",
		highlights: [
			"Modern landing pages tailored to AI positioning",
			"Responsive front-end with clear CTA and trust sections",
			"CMS-ready structure for growth content and updates",
		],
	},
	{
		title: "Velocity Electronics",
		slug: "velocity-electronics",
		category: "Web Development",
		image: "/home/work1.webp",
		projectType: "WordPress Website",
		liveLink: "https://velocityelectronics.com/",
		overview:
			"A corporate electronics website built to support credibility, product visibility, and B2B relationship-building.",
		highlights: [
			"Professional layout for industrial and electronics audiences",
			"Responsive information architecture for products and services",
			"Flexible CMS for ongoing updates and campaigns",
		],
	},
	{
		title: "Gridstone Power",
		slug: "gridstone-power",
		category: "Web Development",
		image: "/home/work2.webp",
		projectType: "WordPress Website",
		liveLink: "https://gridstonepower.com/",
		overview:
			"An energy-focused company website created to communicate solutions, technical value, and market credibility.",
		highlights: [
			"Clear messaging for infrastructure and energy services",
			"Responsive corporate design for decision-makers",
			"CMS-backed structure supporting scalable content growth",
		],
	},
	{
		title: "Mezzo Technologies",
		slug: "mezzo-technologies",
		category: "Web Development",
		image: "/home/work3.jpg",
		projectType: "WordPress Website",
		liveLink: "https://mezzotechnologies.com/",
		overview:
			"A technology company website designed for product communication, industrial trust, and business development support.",
		highlights: [
			"Professional B2B presentation with clean hierarchy",
			"Responsive design for technical audiences",
			"Flexible CMS for product, insight, and company pages",
		],
	},
	{
		title: "Ace Thermal Systems",
		slug: "ace-thermal-systems",
		category: "Web Development",
		image: "/home/work4.jpg",
		projectType: "WordPress Website",
		liveLink: "https://acethermalsystems.com/",
		overview:
			"A corporate industrial website built to present thermal solutions, services, and business credibility in a straightforward way.",
		highlights: [
			"Responsive service pages for industrial buyers",
			"Lead-oriented layout supporting inquiries and trust",
			"CMS-managed structure for future content expansion",
		],
	},
	{
		title: "Signia Aerospace",
		slug: "signia-aerospace",
		category: "Web Development",
		image: "/home/work5.jpg",
		projectType: "WordPress Website",
		liveLink: "https://signiaaerospace.com/",
		overview:
			"An aerospace-focused corporate website built around credibility, capabilities, and strong enterprise positioning.",
		highlights: [
			"Professional brand presentation for advanced industries",
			"Responsive layout tailored to B2B trust and clarity",
			"Scalable CMS structure for services and company updates",
		],
	},
	{
		title: "OmniCleanAir",
		slug: "omni-clean-air",
		category: "Web Development",
		image: "/services/services10.jpg",
		projectType: "WordPress Website",
		liveLink: "https://omnicleanair.com/",
		overview:
			"A clean and modern business website created to communicate air-quality solutions, services, and commercial value.",
		highlights: [
			"Clear messaging for operational and environmental benefits",
			"Responsive design supporting trust and lead capture",
			"CMS-driven content structure for long-term updates",
		],
	},
	{
		title: "Automate Labels",
		slug: "automate-labels",
		category: "Web Development",
		image: "/home/work1.webp",
		projectType: "WordPress Website",
		liveLink: "https://www.automatelabels.com/",
		overview:
			"A product-oriented website built to present automation solutions, industrial workflows, and technical business value.",
		highlights: [
			"Structured B2B layout for product and service clarity",
			"Responsive interface built for practical decision-making",
			"CMS-supported content management for scalable growth",
		],
	},
	{
		title: "Sublime Systems",
		slug: "sublime-systems",
		category: "Web Development",
		image: "/home/work2.webp",
		projectType: "WordPress Website",
		liveLink: "https://sublime-systems.com/",
		overview:
			"A modern technology and sustainability website designed to present innovation, company vision, and industry relevance.",
		highlights: [
			"Mission-led storytelling with business-ready structure",
			"Responsive design supporting modern brand positioning",
			"CMS-backed framework for publishing and updates",
		],
	},
	{
		title: "Report Card",
		slug: "report-card",
		category: "Web Development",
		image: "/home/work3.jpg",
		projectType: "WordPress Website",
		liveLink: "https://reportcard.com/",
		overview:
			"A digital product website built to present reporting, insights, and service value in a clean and trustworthy format.",
		highlights: [
			"Information-first layout for clarity and usability",
			"Responsive pages for accessibility across devices",
			"Flexible CMS structure for scalable content management",
		],
	},
	{
		title: "Front Porch Properties",
		slug: "front-porch-properties",
		category: "Web Development",
		image: "/home/work4.jpg",
		projectType: "Shopify Storefront",
		liveLink: "https://frontporchproperties.com.au/",
		overview:
			"A Shopify storefront and brand website designed to present products, collections, and a polished shopping experience.",
		highlights: [
			"Storefront UX optimized for browsing and conversion",
			"Responsive catalog presentation across all devices",
			"Merchant-friendly structure for products and content",
		],
	},
	{
		title: "Bokser Home",
		slug: "bokser-home",
		category: "Web Development",
		image: "/home/work5.jpg",
		projectType: "Shopify Storefront",
		liveLink: "https://bokserhome.com/",
		overview:
			"A premium Shopify eCommerce website built around home products, brand consistency, and conversion-focused shopping journeys.",
		highlights: [
			"Elegant eCommerce design for product storytelling",
			"Responsive collection and product-detail experience",
			"Store management structure aligned to merchant needs",
		],
	},
	{
		title: "DR Ltd",
		slug: "dr-ltd",
		category: "Web Development",
		image: "/services/services10.jpg",
		projectType: "Wix Website",
		liveLink: "https://www.drltd.co.uk/",
		overview:
			"A straightforward business website built in Wix to support service presentation, brand trust, and easy content management.",
		highlights: [
			"Accessible editing workflow for non-technical updates",
			"Responsive pages designed for professional presentation",
			"Simple structure supporting lead generation and growth",
		],
	},
	{
		title: "Pupsi Home",
		slug: "pupsi-home",
		category: "Web Development",
		image: "/home/work1.webp",
		projectType: "Squarespace Website",
		liveLink: "https://www.pupsihome.co.uk/",
		overview:
			"A clean Squarespace website with a lifestyle-focused presentation, simple navigation, and strong brand consistency.",
		highlights: [
			"Elegant template-driven experience with polished content flow",
			"Responsive pages tailored to visual brand storytelling",
			"Easy maintenance for ongoing content and product updates",
		],
	},
	{
		title: "Bathroom Discounters",
		slug: "bathroom-discounters-figma",
		category: "UI/UX Design",
		image: "/home/work2.webp",
		projectType: "Figma Prototype",
		liveLink:
			"https://www.figma.com/proto/7CYc01OO6krLtNifKqOcx7/Bathroom-Discounters?node-id=1-2",
		overview:
			"A Figma prototype exploring page structure, visual hierarchy, and conversion-oriented flows for a bathroom retail experience.",
		highlights: [
			"Interactive prototype for stakeholder walkthroughs",
			"Thoughtful UI flow for product discovery and conversion",
			"Design decisions prepared for clean developer handoff",
		],
	},
	{
		title: "Flor Keeps 25",
		slug: "flor-keeps-25-figma",
		category: "UI/UX Design",
		image: "/home/work3.jpg",
		projectType: "Figma Prototype",
		liveLink:
			"https://www.figma.com/design/OTyGGoG1dJSwvPnZ6zOlVP/Flor-Keeps-25?node-id=0-1&p=f",
		overview:
			"A Figma design concept focused on modern interface structure, product presentation, and a clear visual system.",
		highlights: [
			"Clean wireframe-to-UI thinking for better user flow",
			"Component-minded design supporting scalable screens",
			"Presentation-ready layouts for fast stakeholder alignment",
		],
	},
	{
		title: "BaseSite",
		slug: "basesite-odoo",
		category: "Odoo Development",
		image: "/home/work4.jpg",
		projectType: "ERP & Business System",
		liveLink: "https://www.basesite.com/",
		overview:
			"An Odoo-based business system project focused on process alignment, operations support, and scalable workflow structure.",
		highlights: [
			"ERP-friendly implementation aligned to real business operations",
			"Structured workflows for efficiency and visibility",
			"Scalable foundation for reporting and automation",
		],
	},
	{
		title: "Dexos AI",
		slug: "dexos-ai-odoo",
		category: "Odoo Development",
		image: "/home/work5.jpg",
		projectType: "ERP & Business System",
		liveLink: "https://dexos.ai/",
		overview:
			"An Odoo-related business platform engagement combining operational workflow thinking with a modern technology-driven brand.",
		highlights: [
			"Business-system approach tailored to process clarity",
			"Implementation mindset focused on scalability and control",
			"Strong foundation for future automation and integrations",
		],
	},
	{
		title: "Pay for Stripe",
		slug: "pay-for-stripe",
		category: "App Development",
		image: "/home/work1.webp",
		projectType: "Finance Application",
		liveLink: "https://apps.apple.com/us/app/pay-for-stripe/id1440091081?mt=8",
		overview:
			"A mobile payment application built to help businesses accept card and digital wallet payments quickly and securely on the go.",
		highlights: [
			"Mobile-first payment flow for fast transaction handling",
			"Support for modern payment methods and secure checkout",
			"Clean UX designed for real-world merchant usage",
		],
	},
	{
		title: "Freeletics: Workouts & Fitness",
		slug: "freeletics-workouts-fitness",
		category: "App Development",
		image: "/home/work2.webp",
		projectType: "Fitness Application",
		liveLink: "https://apps.apple.com/us/app/freeletics-workout-fitness/id654810212",
		overview:
			"A large-scale fitness platform delivering personalized workouts, coaching experiences, and progress-driven user engagement.",
		highlights: [
			"Personalized workout journeys and training plans",
			"Scalable mobile experience for high user engagement",
			"Strong focus on retention through guided fitness flows",
		],
	},
	{
		title: "Keep Fitness Workout Trainer",
		slug: "keep-fitness-workout-trainer",
		category: "App Development",
		image: "/home/work3.jpg",
		projectType: "Fitness Application",
		liveLink:
			"https://apps.apple.com/us/app/keep-fitness-workout-trainer/id1287964023",
		overview:
			"A mobile fitness solution designed for structured home workouts, guided routines, and accessible daily exercise planning.",
		highlights: [
			"User-friendly workout guidance for home fitness",
			"Progress-focused experience with repeat engagement",
			"Mobile flows optimized for training convenience",
		],
	},
	{
		title: "theCut: Barbershop Booking",
		slug: "thecut-barbershop-booking",
		category: "Mobile App Solutions",
		image: "/home/work4.jpg",
		projectType: "Service Marketplace Application",
		liveLink:
			"https://apps.apple.com/us/app/thecut-1-barber-booking-app/id1101408626",
		overview:
			"A barber service marketplace app built for discovery, scheduling, and streamlined appointment booking between clients and professionals.",
		highlights: [
			"Appointment booking and barber discovery experience",
			"Marketplace UX for service visibility and trust",
			"Mobile-first design for repeat customer usage",
		],
	},
	{
		title: "Myntra - Fashion Shopping App",
		slug: "myntra-fashion-shopping-app",
		category: "Mobile App Solutions",
		image: "/home/work5.jpg",
		projectType: "eCommerce Application",
		liveLink:
			"https://apps.apple.com/us/app/myntra-fashion-shopping-app/id907394059",
		overview:
			"A large-scale shopping app experience focused on fashion discovery, catalog browsing, secure purchasing, and customer-friendly mobile commerce.",
		highlights: [
			"High-volume eCommerce browsing and purchase flow",
			"Mobile shopping UX focused on product discovery",
			"Strong retail experience with conversion-oriented design",
		],
	},
	{
		title: "Markies AR",
		slug: "markies-ar",
		category: "App Development",
		image: "/services/services10.jpg",
		projectType: "Augmented Reality Application",
		liveLink:
			"https://itunes.apple.com/us/app/markies-leave-your-mark-in-ar/id1238852487?mt=8",
		overview:
			"An augmented reality mobile experience that blends digital interaction with real-world environments for immersive user engagement.",
		highlights: [
			"AR-powered experience for interactive mobile use cases",
			"Immersive visual engagement in real-world environments",
			"Product design centered on creativity and exploration",
		],
	},
	{
		title: "Citi Bike",
		slug: "citi-bike",
		category: "App Development",
		image: "/home/work1.webp",
		projectType: "Mobility Application",
		liveLink: "https://apps.apple.com/us/app/citi-bike/id641194843",
		overview:
			"A mobility app built around bike discovery, unlock workflows, ride access, and real-time convenience for urban transportation users.",
		highlights: [
			"Location-aware experience for mobility access",
			"Real-time interaction for ride discovery and activation",
			"Mobile UX designed for fast, practical everyday use",
		],
	},
	{
		title: "C_SUITE",
		slug: "c-suite-news",
		category: "App Development",
		image: "/home/work2.webp",
		projectType: "News Application",
		liveLink: "https://apps.apple.com/us/app/c-suite/id1514478644",
		overview:
			"A mobile news and information platform designed to deliver curated updates, content visibility, and a clean reading experience.",
		highlights: [
			"Content-first mobile reading interface",
			"Structured information delivery for daily engagement",
			"Simple UX focused on clarity and accessibility",
		],
	},
	{
		title: "Hidden Camera Detector",
		slug: "hidden-camera-detector",
		category: "App Development",
		image: "/home/work3.jpg",
		projectType: "Security Utility Application",
		liveLink:
			"https://apps.apple.com/us/app/hidden-camera-detector/id532882360",
		platformLinks: {
			ios: "https://apps.apple.com/us/app/hidden-camera-detector/id532882360",
			android:
				"https://play.google.com/store/apps/details?id=com.lsc.hcd",
		},
		overview:
			"A privacy and security utility app created to help users detect suspicious devices and improve personal safety awareness.",
		highlights: [
			"Utility-focused design for security-related use cases",
			"Cross-platform availability for wider user access",
			"Simple, action-oriented mobile experience",
		],
	},
	{
		title: "Blinkist: Book Summaries Daily",
		slug: "blinkist-book-summaries-daily",
		category: "App Development",
		image: "/home/work4.jpg",
		projectType: "Educational Application",
		liveLink:
			"https://apps.apple.com/us/app/blinkist-always-learning/id568839295",
		overview:
			"An educational mobile platform centered on condensed learning, audio and text summaries, and high-frequency content engagement.",
		highlights: [
			"Micro-learning experience for busy mobile users",
			"Strong content structure for repeat consumption",
			"Educational product design with clear user value",
		],
	},
	{
		title: "Ecwid Ecommerce",
		slug: "ecwid-ecommerce",
		category: "App Development",
		image: "/home/work5.jpg",
		projectType: "eCommerce Management Application",
		liveLink: "https://apps.apple.com/us/app/ecwid-ecommerce/id626731456",
		overview:
			"A merchant-focused eCommerce app built for store management, product updates, order handling, and business operations on mobile.",
		highlights: [
			"Store administration from a mobile interface",
			"Order, product, and inventory management support",
			"Business-focused UX for merchant productivity",
		],
	},
	{
		title: "Yandex Music, Books & Podcasts",
		slug: "yandex-music-books-podcasts",
		category: "App Development",
		image: "/services/services10.jpg",
		projectType: "Music & Media Application",
		liveLink:
			"https://itunes.apple.com/us/app/yandex-music/id520797969?mt=8",
		overview:
			"A digital media platform delivering music, audio content, and entertainment experiences through a polished and content-rich mobile interface.",
		highlights: [
			"Streaming-focused experience for media consumption",
			"Mobile design optimized for content engagement",
			"Scalable product structure for broad content delivery",
		],
	},
	{
		title: "Untold",
		slug: "untold-festival-app",
		category: "App Development",
		image: "/home/work1.webp",
		projectType: "Event Application",
		liveLink: "https://itunes.apple.com/us/app/untold/id1019269879?mt=8",
		overview:
			"An event-focused mobile application designed for festival information, schedules, announcements, and user engagement before and during live experiences.",
		highlights: [
			"Live event support through schedule and content access",
			"Mobile experience tailored to high-engagement audiences",
			"Clear information architecture for event navigation",
		],
	},
	{
		title: "SPIN Car Buying App",
		slug: "spin-car-buying-app",
		category: "App Development",
		image: "/home/work2.webp",
		projectType: "Automotive Marketplace Application",
		liveLink:
			"https://apps.apple.com/us/app/spin-car-buying-app/id1133713615#?platform=iphone",
		overview:
			"A mobile automotive product built to support car discovery, vehicle browsing, and user-friendly shopping interactions.",
		highlights: [
			"Marketplace-style flow for automotive exploration",
			"Mobile shopping experience tailored to vehicle buyers",
			"Clean interface designed for research and decision-making",
		],
	},
	{
		title: "Surency Vision Mobile",
		slug: "surency-vision-mobile",
		category: "Business Systems",
		image: "/home/work3.jpg",
		projectType: "Health Benefits Application",
		liveLink:
			"https://apps.apple.com/us/app/surency-vision-mobile/id1049167904",
		platformLinks: {
			web: "https://www.surency.com/",
			ios: "https://apps.apple.com/us/app/surency-vision-mobile/id1049167904",
			android:
				"https://play.google.com/store/apps/details?id=com.app.surencyvision",
		},
		overview:
			"A health benefits mobile app designed to give members convenient access to vision coverage, provider lookup, eligibility details, and claim information.",
		highlights: [
			"Health benefits access through a simple mobile interface",
			"Provider search, eligibility, and claim support workflows",
			"Cross-platform delivery for member convenience",
		],
	},
	{
		title: "Surency Flex",
		slug: "surency-flex",
		category: "Business Systems",
		image: "/home/work4.jpg",
		projectType: "Finance & Benefits Application",
		liveLink:
			"https://apps.apple.com/us/app/surency-flex/id594231327?platform=iphone",
		platformLinks: {
			ios: "https://apps.apple.com/us/app/surency-flex/id594231327?platform=iphone",
			android:
				"https://play.google.com/store/apps/details?id=com.lighthouse1.mobilebenefits.sur",
		},
		overview:
			"A benefits management app created to help users access flex account information, review claims, and manage benefit-related financial workflows.",
		highlights: [
			"Benefits and account visibility in one mobile experience",
			"Finance-oriented workflows built for clarity and ease of use",
			"Cross-platform access for everyday member needs",
		],
	},
	{
		title: "Retail Odoo ERP Suite",
		slug: "retail-odoo-erp-suite",
		category: "Odoo Development",
		image: "/home/work3.jpg",
		projectType: "ERP Implementation",
		overview:
			"Custom Odoo implementation for retail operations including inventory, sales, and multi-store management with automated workflows.",
		highlights: [
			"Odoo module customization for retail workflows",
			"Multi-location inventory and order management",
			"Integrated reporting and business intelligence",
		],
	},
	{
		title: "Manufacturing Odoo Platform",
		slug: "manufacturing-odoo-platform",
		category: "Odoo Development",
		image: "/home/work4.jpg",
		projectType: "Manufacturing ERP",
		overview:
			"Odoo-based manufacturing ERP with production planning, quality control, and supply chain integration.",
		highlights: [
			"Production scheduling and resource planning",
			"Quality assurance and traceability modules",
			"Vendor and procurement integration",
		],
	},
	{
		title: "Crypto Wallet Platform",
		slug: "crypto-wallet-platform",
		category: "Blockchain Solutions",
		image: "/home/work5.jpg",
		projectType: "Blockchain Application",
		overview:
			"Secure multi-chain cryptocurrency wallet with support for multiple assets, DeFi integrations, and transaction management.",
		highlights: [
			"Multi-chain wallet with secure key management",
			"DeFi protocol integrations",
			"Real-time portfolio and transaction tracking",
		],
	},
	{
		title: "NFT Marketplace",
		slug: "nft-marketplace",
		category: "Blockchain Solutions",
		image: "/services/services10.jpg",
		projectType: "Blockchain Platform",
		overview:
			"Decentralized NFT marketplace for digital asset creation, trading, and royalty management on blockchain.",
		highlights: [
			"Smart contract deployment and management",
			"Creator royalties and secondary sales",
			"Cross-platform marketplace experience",
		],
	},
	{
		title: "AI-Powered Analytics Dashboard",
		slug: "ai-analytics-dashboard",
		category: "AI Integration & Platforms",
		image: "/home/work1.webp",
		projectType: "AI Platform",
		overview:
			"Intelligent analytics platform using machine learning for predictive insights, anomaly detection, and automated reporting.",
		highlights: [
			"ML-powered predictive analytics",
			"Natural language query interface",
			"Automated insight generation",
		],
	},
	{
		title: "Smart Document Processing",
		slug: "smart-document-processing",
		category: "AI Integration & Platforms",
		image: "/home/work2.webp",
		projectType: "AI Solution",
		overview:
			"AI-driven document extraction and classification system for automated data entry and workflow automation.",
		highlights: [
			"OCR and intelligent data extraction",
			"Document classification and routing",
			"Integration with existing business systems",
		],
	},
	{
		title: "Desktop Inventory Manager",
		slug: "desktop-inventory-manager",
		category: "Desktop Software",
		image: "/home/work3.jpg",
		projectType: "Desktop Application",
		overview:
			"Cross-platform desktop application for inventory tracking, reporting, and offline-capable warehouse management.",
		highlights: [
			"Native desktop experience on Windows and macOS",
			"Offline-first architecture",
			"Local database and sync capabilities",
		],
	},
	{
		title: "Enterprise Desktop Suite",
		slug: "enterprise-desktop-suite",
		category: "Desktop Software",
		image: "/home/work4.jpg",
		projectType: "Desktop Application",
		overview:
			"Comprehensive desktop suite for enterprise resource planning, reporting, and internal tool integration.",
		highlights: [
			"Modular desktop application architecture",
			"Secure local data storage",
			"Integration with cloud services",
		],
	},
	{
		title: "Customer Portal Platform",
		slug: "customer-portal-platform",
		category: "Web Development",
		image: "/home/work5.jpg",
		projectType: "Web Application",
		overview:
			"Modern customer portal built for self-service, account management, and support ticket handling.",
		highlights: [
			"Responsive web application design",
			"Role-based access and dashboards",
			"API integration with backend systems",
		],
	},
	{
		title: "Workflow Automation Platform",
		slug: "workflow-automation-platform",
		category: "Custom Software",
		image: "/services/services10.jpg",
		projectType: "Custom Solution",
		overview:
			"Custom workflow automation platform connecting internal tools, APIs, and business processes.",
		highlights: [
			"Visual workflow builder",
			"Multi-system integration",
			"Automated trigger and action flows",
		],
	},
];

export const workMenuItems = [
	"All",
	"Web Development",
	"App Development",
	"Odoo Development",
	"Blockchain Platform",
	"AI Integration & Platforms",
	"Desktop Applications",
];

export type BlogCategoryItem = {
	title: string;
	slug: string;
};

export const blogCategoryItems: BlogCategoryItem[] = [
	{ title: "Web Development", slug: "web-development" },
	{ title: "Mobile App Solutions", slug: "mobile-app-solutions" },
	{ title: "Odoo Development", slug: "odoo-development" },
	{ title: "AI Integration & Platforms", slug: "ai-integration-platforms" },
	{ title: "Blockchain Solutions", slug: "blockchain-solutions" },
	{ title: "Desktop Software", slug: "desktop-software" },
	{ title: "Custom Software", slug: "custom-software" },
	{ title: "Business Systems", slug: "business-systems" },
];

export const blogItems = [
	{
		id: "web-performance-conversion-strategy",
		title: "How Modern Web Development Improves Performance, SEO, and Conversion",
		category: "Web Development",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Modern web development helps businesses improve speed, search visibility, and customer conversion.",
		content:
			"Modern web development is no longer only about visual design. It directly affects search engine visibility, conversion rates, and user trust. Fast-loading pages, responsive layouts, optimized code, and clear user flows help businesses reduce bounce rates and guide visitors toward meaningful actions such as inquiries, bookings, and purchases. A well-built website becomes a reliable digital asset that supports both brand credibility and long-term growth.",
	},
	{
		id: "website-rebuild-vs-refactor",
		title: "When a Business Website Needs a Rebuild Instead of a Simple Redesign",
		category: "Web Development",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Some websites need structural improvement, not just a visual refresh.",
		content:
			"A redesign can improve appearance, but it does not always solve deeper technical issues. Businesses often need a full rebuild when their website suffers from poor performance, outdated architecture, limited scalability, weak mobile usability, or difficult content management. Rebuilding with a stronger technical foundation allows teams to improve maintainability, SEO, security, and future feature expansion without carrying forward old limitations.",
	},
	{
		id: "mobile-app-value-customer-engagement",
		title: "Why Mobile App Solutions Create Stronger Customer Engagement",
		category: "Mobile App Solutions",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Mobile apps help businesses build direct, consistent, and valuable user engagement.",
		content:
			"Mobile app solutions give businesses a direct channel to serve users more efficiently. Features such as push notifications, account access, real-time updates, personalized experiences, and simplified transactions create stronger engagement than many web-only experiences. When designed around real customer behavior, a mobile app becomes more than a product extension—it becomes a practical tool for retention, convenience, and long-term brand loyalty.",
	},
	{
		id: "native-vs-cross-platform-app-strategy",
		title: "Native vs Cross-Platform Mobile App Solutions: Choosing the Right Strategy",
		category: "Mobile App Solutions",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"The right mobile development approach depends on performance, budget, and product goals.",
		content:
			"Choosing between native and cross-platform development is a strategic decision. Native apps usually offer stronger device-level performance, deeper platform integration, and maximum flexibility, while cross-platform solutions can reduce time to market and streamline maintenance across iOS and Android. The right choice depends on product complexity, expected scale, feature requirements, and the level of user experience a business wants to deliver.",
	},
	{
		id: "odoo-customization-business-efficiency",
		title: "How Odoo Development Improves Operational Efficiency Across Teams",
		category: "Odoo Development",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Odoo development helps businesses unify workflows and reduce manual operations.",
		content:
			"Odoo development allows businesses to connect departments, automate repetitive work, and centralize critical business data. With the right customization, companies can align sales, inventory, accounting, CRM, procurement, and reporting inside one structured system. This reduces duplication, improves visibility, and gives decision-makers a more reliable operational foundation. A well-implemented Odoo environment supports efficiency today while remaining flexible enough to grow with the business.",
	},
	{
		id: "odoo-migration-planning-guide",
		title: "What Businesses Should Plan Before an Odoo Migration or Upgrade",
		category: "Odoo Development",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Successful Odoo upgrades require planning around data, custom modules, and integrations.",
		content:
			"An Odoo migration or upgrade should never be treated as a simple technical switch. Businesses need to review custom modules, workflows, integrations, reporting logic, data quality, and user permissions before moving to a new version or hosting environment. Careful planning helps reduce downtime, avoid broken processes, and protect business continuity. The goal is not only to upgrade the system, but to improve reliability and future maintainability at the same time.",
	},
	{
		id: "ai-integration-practical-business-roadmap",
		title: "A Practical AI Integration Roadmap for Modern Businesses",
		category: "AI Integration & Platforms",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"AI integration works best when it starts with clear business problems and measurable outcomes.",
		content:
			"AI integration delivers value when it is tied to operational goals rather than trends. Businesses should begin by identifying repetitive tasks, support bottlenecks, decision-making delays, or content-heavy workflows that can benefit from automation or intelligence. From there, teams can define data requirements, security boundaries, implementation steps, and success metrics. A practical roadmap reduces risk and helps AI initiatives move from experimentation to real business impact.",
	},
	{
		id: "internal-ai-tools-productivity",
		title: "How Internal AI Platforms Reduce Repetitive Work and Improve Productivity",
		category: "AI Integration & Platforms",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Internal AI tools can streamline support, analysis, and daily operational tasks.",
		content:
			"Internal AI platforms can help teams move faster by reducing the time spent on repetitive, low-value work. Common use cases include document analysis, internal search, knowledge assistance, workflow recommendations, support automation, and operational summarization. When built with proper controls and aligned to real use cases, internal AI tools improve response speed, reduce manual effort, and allow employees to focus on work that requires judgment and strategic thinking.",
	},
	{
		id: "blockchain-business-use-cases",
		title: "Blockchain Solutions Beyond Crypto: Practical Business Use Cases",
		category: "Blockchain Solutions",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Blockchain can support trust, transparency, and secure digital processes across industries.",
		content:
			"Blockchain solutions are often misunderstood as cryptocurrency-only technology, but their value goes much further. Businesses can use blockchain for asset tracking, transaction verification, shared records, digital identity, auditability, and smart contract automation. The strongest blockchain projects focus on problems where trust, transparency, and verification are essential. When applied to the right business model, blockchain can create more secure and accountable digital systems.",
	},
	{
		id: "smart-contract-development-risk-management",
		title: "Why Smart Contract Development Requires Security-First Planning",
		category: "Blockchain Solutions",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Smart contracts should be designed with security, testing, and long-term reliability in mind.",
		content:
			"Smart contracts can automate high-value logic, but they also introduce permanent risk when poorly designed. Security-first planning is essential because vulnerabilities, flawed business logic, and inadequate testing can lead to financial loss and reputational damage. Professional smart contract development includes architecture review, test coverage, validation of edge cases, and careful consideration of upgrade paths. Strong preparation protects both users and the long-term credibility of the platform.",
	},
	{
		id: "desktop-software-business-reliability",
		title: "Why Desktop Software Still Matters for Reliability and Operational Control",
		category: "Desktop Software",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Desktop software remains important for performance, security, and specialized workflows.",
		content:
			"Desktop software continues to serve an important role in industries that require speed, local processing, hardware integration, stronger control, or offline capability. For internal tools, secure workstations, and specialized business operations, desktop applications often provide a more stable and focused environment than browser-based systems. When properly engineered, desktop software supports consistent performance, stronger access control, and efficient workflows tailored to operational needs.",
	},
	{
		id: "desktop-security-software-strategy",
		title: "How Secure Desktop Software Protects Sensitive Business Operations",
		category: "Desktop Software",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Secure desktop applications help businesses protect devices, data, and internal workflows.",
		content:
			"Security is a major reason many businesses continue investing in desktop software. Applications that handle internal data, financial activity, regulated operations, or device-level integrations often require tighter control than standard web environments can provide. Secure desktop software can support role-based access, local encryption, protected workflows, and controlled system interaction. A strong desktop security strategy helps reduce operational risk while keeping critical tasks efficient and reliable.",
	},
	{
		id: "custom-software-workflow-advantage",
		title: "How Custom Software Solves Workflow Problems That Generic Tools Cannot",
		category: "Custom Software",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Custom software gives businesses a better fit for their real processes and growth goals.",
		content:
			"Off-the-shelf tools are useful, but they often force teams to adjust their processes around product limitations. Custom software takes the opposite approach by being designed around the actual workflow, operational priorities, and customer needs of the business. This leads to fewer workarounds, stronger productivity, and better integration with existing systems. Over time, custom software becomes a competitive asset because it reflects how the business truly operates.",
	},
	{
		id: "software-maintenance-protects-value",
		title: "Why Ongoing Software Maintenance Protects Long-Term Business Value",
		category: "Custom Software",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Maintenance keeps software secure, stable, efficient, and ready for future growth.",
		content:
			"Ongoing software maintenance is essential for protecting the value of a digital product after launch. It includes bug resolution, dependency updates, security patches, performance tuning, technical cleanup, and small functional improvements that keep the system reliable. Businesses that maintain their software proactively reduce the risk of downtime, security issues, and costly rebuilds. Maintenance is not just support work—it is a long-term investment in product stability and business continuity.",
	},
	{
		id: "business-systems-integration-visibility",
		title: "How Connected Business Systems Improve Visibility and Decision-Making",
		category: "Business Systems",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Integrated business systems help leaders make faster and more accurate decisions.",
		content:
			"When business data is spread across disconnected tools, teams lose time and leadership loses visibility. Connected business systems allow organizations to bring together operations, finance, customer data, reporting, and internal workflows in a more unified structure. This reduces manual reconciliation, improves reporting accuracy, and supports stronger decision-making. Better systems integration creates a clearer operational picture and helps businesses respond more effectively to growth and change.",
	},
	{
		id: "scalable-business-systems-foundation",
		title: "Building Scalable Business Systems for Long-Term Operational Growth",
		category: "Business Systems",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Scalable business systems create a stronger foundation for growth, automation, and control.",
		content:
			"Scalable business systems are designed to support growth without creating operational chaos. As a company expands, manual processes, disconnected tools, and inconsistent reporting begin to slow execution. Building the right systems foundation means designing workflows, integrations, permissions, and automation that can grow with the organization. Businesses that invest early in scalable systems gain stronger control, better efficiency, and a clearer path for future expansion.",
	},
	{
		id: "web-performance-strategy",
		title: "Web Performance Strategies That Improve Conversions",
		category: "Web Development",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Faster websites create better user experiences and stronger business results.",
		content:
			"Performance is more than a technical metric. It directly affects bounce rate, search visibility, and customer trust. Teams that optimize loading speed, interaction flow, and responsiveness often see stronger engagement and higher conversion rates.",
	},
	{
		id: "modern-business-website",
		title: "What Makes a Modern Business Website Effective",
		category: "Web Development",
		image: "/home/work2.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"A strong business website should communicate value clearly and guide users to action.",
		content:
			"An effective website combines clear messaging, clean navigation, mobile responsiveness, and conversion-focused design. When strategy and usability work together, a website becomes a growth asset instead of just an online brochure.",
	},
	{
		id: "seo-ready-development",
		title: "SEO-Ready Development from the Start",
		category: "Web Development",
		image: "/home/work3.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Technical SEO decisions made early can save time and improve visibility later.",
		content:
			"Search-friendly development starts with structured content, semantic markup, optimized performance, and strong technical foundations. Building with SEO in mind from day one helps businesses avoid expensive fixes after launch.",
	},
	{
		id: "scalable-web-architecture",
		title: "Scalable Web Architecture for Growing Companies",
		category: "Web Development",
		image: "/home/work4.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Scalability starts with decisions made long before traffic begins to grow.",
		content:
			"Growing companies need web platforms that can support new users, features, and integrations without losing performance. Clean architecture, modular development, and thoughtful infrastructure planning make growth much easier to manage.",
	},
	{
		id: "landing-pages-that-convert",
		title: "How to Build Landing Pages That Actually Convert",
		category: "Web Development",
		image: "/home/work5.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"High-converting landing pages focus on clarity, trust, and a strong next step.",
		content:
			"Landing pages perform best when they remove friction and communicate value quickly. Clear headlines, focused content, proof points, and strong calls to action help visitors make confident decisions faster.",
	},
	{
		id: "enterprise-portal-planning",
		title: "Planning Enterprise Portals for Real-World Operations",
		category: "Web Development",
		image: "/services/services10.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Internal portals should simplify work, not add more complexity for teams.",
		content:
			"Enterprise portals succeed when they are designed around actual operational needs. Role-based access, workflow visibility, and stable integrations help teams work faster while keeping systems organized and secure.",
	},
	{
		id: "mobile-app-mvp",
		title: "How to Define a Mobile App MVP Clearly",
		category: "Mobile App Solutions",
		image: "/home/work2.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"A well-defined MVP reduces waste and helps teams release with confidence.",
		content:
			"Mobile products often fail when teams try to launch too much at once. A clear MVP focuses on the most valuable user journey, supports faster feedback loops, and creates a stronger foundation for future releases.",
	},
	{
		id: "ios-android-planning",
		title: "Planning iOS and Android Apps for Long-Term Growth",
		category: "Mobile App Solutions",
		image: "/home/work3.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Strong mobile planning balances user experience, engineering quality, and release speed.",
		content:
			"Successful mobile apps are built with long-term thinking from the beginning. Product scope, analytics strategy, architecture, and testing standards all shape how smoothly a mobile product can grow after launch.",
	},
	{
		id: "mobile-onboarding-design",
		title: "Why Mobile Onboarding Deserves More Attention",
		category: "Mobile App Solutions",
		image: "/home/work4.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"First impressions on mobile are short, and onboarding often determines retention.",
		content:
			"Mobile onboarding should reduce confusion and help users reach value quickly. Clear flows, simple interactions, and purposeful guidance create stronger adoption and reduce early drop-off.",
	},
	{
		id: "cross-platform-vs-native",
		title: "Cross-Platform vs Native: Choosing the Right Mobile Approach",
		category: "Mobile App Solutions",
		image: "/home/work5.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"The right mobile stack depends on product goals, team structure, and future roadmap.",
		content:
			"Cross-platform development can speed up delivery, while native development may offer deeper platform control. The best decision comes from balancing timeline, budget, performance expectations, and long-term product needs.",
	},
	{
		id: "app-store-launch-checklist",
		title: "A Practical Checklist for App Store Launch Readiness",
		category: "Mobile App Solutions",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Launch success depends on more than finishing the codebase.",
		content:
			"Before publishing, teams should review analytics, store assets, crash reporting, permissions, and user onboarding. A structured launch process reduces risk and helps products enter the market in a more professional way.",
	},
	{
		id: "mobile-analytics-foundation",
		title: "Setting Up Mobile Analytics the Right Way",
		category: "Mobile App Solutions",
		image: "/services/services10.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Good analytics reveal how users behave, where they drop off, and what needs improvement.",
		content:
			"Mobile analytics should be planned around business questions, not just event volume. When product teams track meaningful user actions, they make better decisions about onboarding, retention, and future feature investment.",
	},
	{
		id: "odoo-process-optimization",
		title: "How Odoo Helps Streamline Daily Operations",
		category: "Odoo Development",
		image: "/services/services10.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Odoo becomes most valuable when it is aligned with real business processes.",
		content:
			"Odoo can unify operations across sales, inventory, HR, accounting, and support. With the right customization and workflow design, businesses reduce manual tasks and gain more visibility across departments.",
	},
	{
		id: "odoo-custom-module-guide",
		title: "When Custom Odoo Modules Make Sense",
		category: "Odoo Development",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Customization should solve a real operational problem, not create unnecessary complexity.",
		content:
			"Custom modules are most effective when standard features cannot support a specific workflow. The best implementations are well-scoped, maintainable, and designed to improve efficiency without sacrificing upgrade stability.",
	},
	{
		id: "odoo-crm-workflows",
		title: "Improving Sales Workflows with Odoo CRM",
		category: "Odoo Development",
		image: "/home/work2.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Structured CRM workflows help teams move faster and follow up more consistently.",
		content:
			"Odoo CRM can bring structure to lead tracking, pipeline visibility, and team collaboration. With proper automation and reporting, sales teams gain better control over conversion stages and customer communication.",
	},
	{
		id: "odoo-inventory-visibility",
		title: "Better Inventory Visibility Through Odoo",
		category: "Odoo Development",
		image: "/home/work3.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Inventory clarity supports faster operations and more reliable decision-making.",
		content:
			"Odoo helps businesses manage stock levels, warehouse movement, and order flow in one connected environment. This reduces reporting gaps and improves coordination between operations, sales, and logistics teams.",
	},
	{
		id: "odoo-automation-roi",
		title: "The ROI of Business Automation with Odoo",
		category: "Odoo Development",
		image: "/home/work4.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Automation creates value when it saves time, reduces errors, and improves accountability.",
		content:
			"Odoo automation works best when repetitive tasks and approvals are mapped carefully. Businesses often see stronger efficiency when manual handoffs, duplicate entry, and reporting delays are removed from core workflows.",
	},
	{
		id: "odoo-implementation-mistakes",
		title: "Common Odoo Implementation Mistakes to Avoid",
		category: "Odoo Development",
		image: "/home/work5.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Many implementation issues come from unclear scope and weak process mapping.",
		content:
			"Successful Odoo projects require strong discovery, stakeholder alignment, and realistic rollout planning. Businesses avoid costly setbacks when they define priorities clearly and build around operational needs rather than assumptions.",
	},
	{
		id: "ai-support-automation",
		title: "Using AI to Improve Support Workflows",
		category: "AI Integration & Platforms",
		image: "/home/work4.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"AI can reduce repetitive support effort while keeping teams focused on high-value work.",
		content:
			"Support automation is strongest when AI handles common requests, routing, summarization, and knowledge retrieval. With proper guardrails, businesses can increase response speed without losing quality or control.",
	},
	{
		id: "ai-for-internal-operations",
		title: "Practical AI for Internal Operations",
		category: "AI Integration & Platforms",
		image: "/home/work5.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Internal AI use-cases often create fast value with lower risk than customer-facing systems.",
		content:
			"AI works especially well for internal search, document summarization, task assistance, and workflow recommendations. Focused use-cases help teams save time and prove value before scaling adoption further.",
	},
	{
		id: "ai-feature-design",
		title: "Designing AI Features Users Actually Trust",
		category: "AI Integration & Platforms",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Trust in AI comes from clarity, transparency, and predictable system behavior.",
		content:
			"Users are more likely to adopt AI when it explains outcomes clearly and supports human decision-making. Good product design includes fallback paths, confidence signals, and clear expectations around what AI can and cannot do.",
	},
	{
		id: "ai-integration-roadmap",
		title: "Creating an AI Integration Roadmap for Business",
		category: "AI Integration & Platforms",
		image: "/services/services10.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"A roadmap prevents scattered experiments and keeps AI aligned with business goals.",
		content:
			"Businesses benefit most when AI projects are prioritized by measurable impact and implementation readiness. A practical roadmap connects data quality, workflow fit, governance, and expected return before development begins.",
	},
	{
		id: "ai-knowledge-assistants",
		title: "AI Knowledge Assistants for Faster Decision-Making",
		category: "AI Integration & Platforms",
		image: "/home/work2.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Knowledge assistants help teams find answers quickly across fragmented information sources.",
		content:
			"Internal AI assistants become powerful when they are grounded in trusted company data. They reduce search friction, improve response consistency, and help teams act faster with better context.",
	},
	{
		id: "ai-automation-guardrails",
		title: "Why AI Automation Needs Strong Guardrails",
		category: "AI Integration & Platforms",
		image: "/home/work3.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Automation becomes useful when quality, accountability, and review are built in.",
		content:
			"AI automation should not operate as a black box. Clear rules, human review paths, monitoring, and scoped permissions help businesses deploy intelligent workflows with greater confidence and lower operational risk.",
	},
	{
		id: "enterprise-blockchain-fit",
		title: "When Blockchain Is the Right Fit for Enterprise",
		category: "Blockchain Solutions",
		image: "/home/work3.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Blockchain is most effective when trust, auditability, and shared records are essential.",
		content:
			"Not every process needs blockchain, but some workflows benefit greatly from transparency and immutable history. Enterprise use-cases become stronger when multiple parties need trusted data without relying on one central actor.",
	},
	{
		id: "smart-contract-planning",
		title: "Smart Contract Planning Before Development",
		category: "Blockchain Solutions",
		image: "/home/work4.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Smart contracts should reflect real process rules, not just technical possibilities.",
		content:
			"Before writing contract logic, teams should define ownership, failure states, approval rules, and data flows. Clear planning helps reduce vulnerabilities and ensures the system supports real operational requirements.",
	},
	{
		id: "tokenized-workflows",
		title: "Tokenized Workflows for Modern Platforms",
		category: "Blockchain Solutions",
		image: "/home/work5.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Tokenization can create new process models when linked to actual business value.",
		content:
			"Tokenized workflows work best when they improve traceability, access control, or transactional coordination. The strongest platforms use token mechanics to support real user incentives and business processes.",
	},
	{
		id: "wallet-integration-guide",
		title: "A Practical Guide to Wallet Integration",
		category: "Blockchain Solutions",
		image: "/services/services10.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Wallet integration should feel secure, simple, and understandable for end users.",
		content:
			"Successful wallet experiences depend on clear flows, strong messaging, and careful handling of transaction states. Businesses reduce confusion when they make blockchain interactions feel more intuitive and less intimidating.",
	},
	{
		id: "blockchain-audit-readiness",
		title: "Designing Blockchain Products with Audit Readiness in Mind",
		category: "Blockchain Solutions",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Security review should shape how blockchain products are designed from the start.",
		content:
			"Audit-ready systems come from simple logic, clear permissions, careful testing, and documented assumptions. Building with reviewability in mind helps teams improve trust and reduce long-term risk.",
	},
	{
		id: "dapp-user-experience",
		title: "Why User Experience Matters in dApp Development",
		category: "Blockchain Solutions",
		image: "/home/work2.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Complex blockchain products still need simple, human-centered product design.",
		content:
			"dApps succeed when technical complexity is hidden behind intuitive interactions. Clear onboarding, transaction visibility, and thoughtful feedback loops help users trust and continue using decentralized products.",
	},
	{
		id: "desktop-apps-modern-role",
		title: "The Modern Role of Desktop Applications in Business",
		category: "Desktop Software",
		image: "/home/work5.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Desktop software remains valuable for secure, stable, and performance-heavy workflows.",
		content:
			"Many business environments still rely on desktop applications for internal operations, offline access, or specialized workflows. When designed well, desktop tools deliver speed, control, and reliability that web-only systems may not provide.",
	},
	{
		id: "offline-first-desktop",
		title: "Why Offline-First Desktop Tools Still Matter",
		category: "Desktop Software",
		image: "/home/work4.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Offline capability is critical in many real operational environments.",
		content:
			"Teams working in restricted, remote, or unstable connectivity conditions benefit from desktop systems that continue performing without interruption. Offline-first design ensures continuity while preserving data integrity and workflow stability.",
	},
	{
		id: "desktop-internal-tools",
		title: "Building Desktop Tools for Internal Teams",
		category: "Desktop Software",
		image: "/home/work3.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Internal tools should support speed, clarity, and operational consistency.",
		content:
			"Desktop applications for internal teams work best when they simplify frequent tasks and reduce dependency on fragmented systems. Clean workflows, role-based access, and stable performance help teams stay productive under pressure.",
	},
	{
		id: "desktop-security-considerations",
		title: "Security Considerations in Desktop Software Development",
		category: "Desktop Software",
		image: "/services/services10.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Business desktop applications need strong security planning beyond basic access control.",
		content:
			"Desktop environments often handle sensitive files, local storage, and internal processes. Secure architecture, permission boundaries, encryption, and controlled updates help protect systems and reduce operational risk.",
	},
	{
		id: "desktop-dashboard-design",
		title: "Designing Desktop Dashboards for Operational Clarity",
		category: "Desktop Software",
		image: "/home/work2.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Operational dashboards should help teams act faster, not just display more data.",
		content:
			"Strong dashboard design focuses on decisions, priorities, and context. Desktop dashboards become more useful when they highlight exceptions, streamline actions, and keep important information visible without overwhelming users.",
	},
	{
		id: "custom-software-advantage",
		title: "Why Custom Software Can Outperform Generic Tools",
		category: "Custom Software",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Custom software creates value when a business needs process fit, not feature overload.",
		content:
			"Off-the-shelf products are useful for standard needs, but custom systems become powerful when workflows are unique or growth demands flexibility. Tailored software gives teams more control over process, data, and scalability.",
	},
	{
		id: "product-discovery-workshop",
		title: "Why Product Discovery Should Come Before Development",
		category: "Custom Software",
		image: "/home/work2.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Discovery helps teams define problems clearly before committing time and budget.",
		content:
			"Great software starts with understanding users, operations, constraints, and goals. Product discovery reduces uncertainty, aligns stakeholders, and leads to smarter delivery decisions throughout the build process.",
	},
	{
		id: "api-first-platform-design",
		title: "The Benefits of API-First Platform Design",
		category: "Custom Software",
		image: "/home/work3.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"API-first thinking improves flexibility, integration readiness, and long-term maintainability.",
		content:
			"When platforms are designed with clear interfaces from the beginning, teams can build faster across web, mobile, and partner ecosystems. API-first architecture supports scale while reducing future integration friction.",
	},
	{
		id: "saas-product-foundations",
		title: "Core Foundations of a Scalable SaaS Product",
		category: "Custom Software",
		image: "/home/work4.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Scalable SaaS products require more than feature delivery alone.",
		content:
			"Multi-tenancy, billing logic, permissions, analytics, and support systems all shape how a SaaS product performs over time. Strong foundations allow teams to grow without repeatedly rebuilding critical parts of the system.",
	},
	{
		id: "workflow-platform-design",
		title: "Designing Workflow Platforms That Teams Will Actually Use",
		category: "Custom Software",
		image: "/home/work5.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Adoption depends on usability, relevance, and clear operational benefit.",
		content:
			"Workflow platforms need to fit naturally into how teams already work. Products gain traction when they reduce friction, improve visibility, and make everyday tasks simpler instead of forcing unnecessary process changes.",
	},
	{
		id: "business-systems-integration",
		title: "Connecting Business Systems for Better Visibility",
		category: "Business Systems",
		image: "/services/services10.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Disconnected systems often create reporting delays and operational blind spots.",
		content:
			"Integrated business systems allow teams to move data more accurately across departments and tools. Strong integration design improves reporting, reduces duplication, and helps leaders make decisions with greater confidence.",
	},
	{
		id: "erp-implementation-strategy",
		title: "ERP Implementation Strategy for Sustainable Growth",
		category: "Business Systems",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"ERP success depends on process alignment, not just software installation.",
		content:
			"Businesses see better ERP outcomes when implementation is phased, realistic, and closely tied to operational priorities. Strong planning helps avoid disruption while delivering lasting value across teams.",
	},
	{
		id: "internal-systems-modernization",
		title: "Modernizing Internal Systems Without Disrupting Operations",
		category: "Business Systems",
		image: "/home/work2.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Modernization works best when it respects how teams operate today.",
		content:
			"Replacing outdated tools requires more than new interfaces. The best modernization projects preserve critical workflows, improve user experience, and create a practical path for adoption across departments.",
	},
	{
		id: "reporting-dashboard-strategy",
		title: "Building Reporting Dashboards That Drive Action",
		category: "Business Systems",
		image: "/home/work3.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Useful dashboards turn operational data into faster and better decisions.",
		content:
			"Dashboards become more valuable when they show the right metrics in the right context. Teams benefit most from reporting systems that highlight trends, risks, and next steps instead of only presenting raw numbers.",
	},
	{
		id: "workflow-automation-strategy",
		title: "A Better Approach to Workflow Automation",
		category: "Business Systems",
		image: "/home/work4.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Automation should remove bottlenecks while keeping control and visibility intact.",
		content:
			"Effective workflow automation starts with identifying repetitive tasks, approval delays, and data handoff issues. Businesses gain more value when automation is tied to measurable outcomes and supported by clear governance.",
	},
	{
		id: "design-thinking-for-software",
		title: "Why Design Thinking Still Matters in Software Projects",
		category: "Web Development",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Strong products are built around real user needs, not assumptions.",
		content:
			"Design thinking helps teams explore user pain points before jumping into implementation. It improves alignment across design, engineering, and business stakeholders while reducing waste during product delivery.",
	},
	{
		id: "software-discovery-documentation",
		title: "How Better Documentation Improves Software Delivery",
		category: "Custom Software",
		image: "/home/work3.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Clear documentation supports stronger collaboration and fewer project surprises.",
		content:
			"Requirements, architecture notes, workflows, and release planning all benefit from thoughtful documentation. It creates shared understanding, reduces ambiguity, and helps teams deliver with more consistency.",
	},
	{
		id: "qa-strategy-for-growing-products",
		title: "QA Strategies for Growing Digital Products",
		category: "Custom Software",
		image: "/home/work4.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Quality assurance becomes more important as features, users, and integrations increase.",
		content:
			"Growing products need structured QA across functional testing, regression coverage, and release validation. A thoughtful QA strategy protects user trust and reduces the cost of fixing issues after deployment.",
	},
	{
		id: "release-management-basics",
		title: "Release Management That Supports Stable Delivery",
		category: "Custom Software",
		image: "/home/work5.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Stable releases depend on planning, communication, and clear deployment processes.",
		content:
			"Release management is more than scheduling a launch date. Teams improve reliability when they coordinate testing, rollback plans, monitoring, and stakeholder readiness before every production release.",
	},
	{
		id: "product-roadmap-prioritization",
		title: "How to Prioritize a Product Roadmap More Effectively",
		category: "Custom Software",
		image: "/services/services10.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Prioritization becomes easier when features are tied to outcomes instead of opinions.",
		content:
			"Strong product roadmaps balance business goals, technical effort, customer value, and long-term platform health. Teams make better roadmap decisions when they focus on impact, not just urgency.",
	},
	{
		id: "ui-ux-for-business-platforms",
		title: "UI and UX Principles for Business Platforms",
		category: "Web Development",
		image: "/home/work2.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Business software should feel clear, efficient, and easy to navigate.",
		content:
			"Users expect enterprise platforms to be intuitive, not complicated. Strong UI and UX decisions improve adoption by reducing friction, supporting common tasks, and helping teams feel more confident inside the system.",
	},
	{
		id: "data-driven-product-improvement",
		title: "Using Product Data to Improve Digital Experiences",
		category: "AI Integration & Platforms",
		image: "/home/work3.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Better product decisions come from meaningful signals, not just more data.",
		content:
			"Data-driven improvement works when teams connect analytics to real user behavior and business outcomes. With clear metrics, organizations can refine flows, remove friction, and prioritize improvements more effectively.",
	},
	{
		id: "customer-portal-best-practices",
		title: "Best Practices for Building Customer Portals",
		category: "Web Development",
		image: "/home/work4.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Customer portals should reduce support effort while improving the client experience.",
		content:
			"Effective portals give users easy access to information, requests, billing, and account activity in one place. When designed well, they improve transparency and strengthen customer satisfaction over time.",
	},
	{
		id: "multi-platform-product-strategy",
		title: "Building One Product Across Web, Mobile, and Desktop",
		category: "Custom Software",
		image: "/home/work5.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Multi-platform products need a clear strategy for consistency and maintainability.",
		content:
			"Teams building across multiple platforms should align architecture, design systems, and shared business logic early. This creates a more consistent experience while reducing duplicated effort across the product ecosystem.",
	},
	{
		id: "software-maintenance-value",
		title: "Why Ongoing Software Maintenance Protects Business Value",
		category: "Custom Software",
		image: "/home/work1.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Maintenance keeps products secure, stable, and ready for future growth.",
		content:
			"Ongoing support is not only about fixing bugs. It includes performance tuning, security updates, dependency management, and incremental improvement that help digital products stay reliable over time.",
	},
	{
		id: "business-automation-at-scale",
		title: "Scaling Business Automation Without Losing Control",
		category: "Business Systems",
		image: "/home/work2.webp",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Automation at scale needs visibility, exception handling, and responsible governance.",
		content:
			"As automation expands across teams, businesses need clear ownership, reporting, and fallback processes. Scalable automation works best when efficiency is balanced with accountability and operational oversight.",
	},
	{
		id: "future-ready-software-platforms",
		title: "What Makes a Software Platform Future-Ready",
		category: "Custom Software",
		image: "/services/services10.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Future-ready platforms are built to adapt without constant rework.",
		content:
			"Modern platforms should support change in features, scale, integrations, and user needs. Flexible architecture, clear system boundaries, and maintainable code help businesses move faster as opportunities evolve.",
	},
	{
		id: "digital-transformation-practical-view",
		title: "A Practical View of Digital Transformation",
		category: "Business Systems",
		image: "/home/work3.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Digital transformation succeeds when it improves daily work in measurable ways.",
		content:
			"Transformation is not only about adopting new tools. It is about redesigning processes, connecting systems, and making operations more efficient through practical technology decisions that support real business goals.",
	},
	{
		id: "engineering-for-reliable-delivery",
		title: "Engineering Practices That Support Reliable Delivery",
		category: "Custom Software",
		image: "/home/work4.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"Reliable delivery comes from disciplined engineering, not rushed execution.",
		content:
			"Teams deliver better software when they combine clear planning, code quality, testing discipline, and deployment readiness. Consistent engineering practices reduce risk and create stronger outcomes for both users and stakeholders.",
	},
	{
		id: "building-products-around-client-goals",
		title: "Building Digital Products Around Client Goals",
		category: "Custom Software",
		image: "/home/work5.jpg",
		authorName: "Nelson Hermance",
		authorAvatar: "/about-us/avatar-placeholder.svg",
		excerpt:
			"The best software projects are shaped by business goals, not just feature lists.",
		content:
			"Product teams create more value when they understand what success looks like for the client from the beginning. Clear goals help guide scope, prioritization, architecture, and delivery decisions throughout the project lifecycle.",
	},
];

export const teamMembers = [
	{
		name: "Nelson Hermance",
		role: "Founder & CEO — Chicago, IL",
		image: "/about-us/nelson.webp",
		email: "nhermance@anchorstacktech.com",
		whatsapp: "https://wa.me/13122595011",
		linkedin: "https://www.linkedin.com/in/nelson-hermance-a7a67410/",
	},
	{
		name: "Dairon Jan Lamprea Rotelo",
		role: "CTO",
		image: "/about-us/dairon.webp",
		email: "daironjan@anchorstacktech.com",
		whatsapp: "https://wa.me/639381963281",
		linkedin: "https://www.linkedin.com/in/dairon-jan-rotelo-822a48391",
	},
	{
		name: "Elizabeth Hermance",
		role: "HR Manager",
		image: "/about-us/betsy.webp",
		email: "elizabeth.hermance@anchorstacktech.com",
		whatsapp: "https://wa.me/13088503206",
		linkedin: "https://www.linkedin.com/",
	},
	{
		name: "Jin Yin",
		role: "Verified HR Business Partner",
		image: "/about-us/jinin.png",
		email: "jinin@anchorstacktech.com",
		whatsapp: "",
		linkedin: "https://www.linkedin.com/in/jin-yin-525b1a396/",
	},
	{
		name: "Chao Wang",
		role: "Lead Software Engineer",
		image: "/about-us/chao.webp",
		email: "chaowang.tech@anchorstacktech.com",
		whatsapp: "https://wa.me/13088503206",
		linkedin: "https://www.linkedin.com/",
	},
	{
		name: "Yaya Sow",
		role: "Senior AI Engineer",
		image: "/about-us/yaya.webp",
		email: "hello@anchorstacktech.com",
		whatsapp: "https://wa.me/13088503206",
		linkedin: "https://www.linkedin.com/in/yaya-sow-a6135a38a/",
	},
	{
		name: "Aboubacry Oumar Tall",
		role: "Senior Odoo Developer",
		image: "/about-us/tall.webp",
		email: "hello@anchorstacktech.com",
		whatsapp: "https://wa.me/22448004894",
		linkedin: "https://www.linkedin.com/in/aboubacry-tall-3883b9209/",
	},
	{
		name: "Abdoul Aziz Diop",
		role: "Senior Mobile Engineer",
		image: "/about-us/abdoul.webp",
		email: "hello@anchorstacktech.com",
		whatsapp: "https://wa.me/13233329742",
		linkedin: "https://www.linkedin.com/in/abdoul-aziz-diop-dev/",
	},
	{
		name: "Lester Bonganay Paderan",
		role: "Senior Software Engineer",
		image: "/about-us/lester.webp",
		email: "lesterpaderan@anchorstacktech.com",
		whatsapp: "https://wa.me/639940294186",
		linkedin: "https://www.linkedin.com/in/lester-bonganay-paderan-59030b3a8/",
	},
	{
		name: "Andersson",
		role: "Senior QA Engineer",
		image: "/about-us/Andersson.png",
		email: "",
		whatsapp: "",
		linkedin: "",
	},
	{
		name: "Zarah Santos Rivera",
		role: "Senior Blockchain Developer",
		image: "/about-us/zarah.webp",
		email: "zarah.rivera@anchorstacktech.com",
		whatsapp: "https://wa.me/639913301582",
		linkedin: "https://www.linkedin.com/in/zarah-rivera-6693523a5/",
	},
];

export type TestimonialItem = {
	id: string;
	serviceTitle: string;
	review: string;
	reviewerName: string;
	reviewerRole: string;
	reviewerAvatar: string;
	rating: number;
	backgroundImage: string;
};

export const testimonialItems: TestimonialItem[] = [
	{
		id: "web-solutions-review",
		serviceTitle: "Web Solutions",
		review:
			"AnchorStackTech is a professional web development company that helped us build a fast, modern, and user-friendly business website. Their team communicated clearly, delivered on time, and improved both our online presence and customer experience.",
		reviewerName: "Daniel Foster",
		reviewerRole: "CEO, BrightPath Consulting",
		reviewerAvatar: "/home/user.webp",
		rating: 5,
		backgroundImage: "/home/home2.webp",
	},
	{
		id: "web-development-seo-review",
		serviceTitle: "Web Solutions",
		review:
			"We were looking for a reliable web design and development partner, and AnchorStackTech exceeded our expectations. They created a professional website that looks great, performs well, and supports our long-term digital growth.",
		reviewerName: "Michael Bennett",
		reviewerRole: "Founder, NorthBridge Consulting",
		reviewerAvatar: "/home/user1.jpg",
		rating: 5,
		backgroundImage: "/home/home2.webp",
	},
	{
		id: "mobile-app-solutions-review",
		serviceTitle: "Mobile App Solutions",
		review:
			"AnchorStackTech delivered an excellent mobile app development service for our business. The app is smooth, easy to use, and well designed for both customers and internal teams. Their work gave us a strong and reliable mobile solution.",
		reviewerName: "Sophia Turner",
		reviewerRole: "Product Manager, BrightPath Apps",
		reviewerAvatar: "/home/user2.jpg",
		rating: 5,
		backgroundImage: "/home/home1.webp",
	},
	{
		id: "app-development-review",
		serviceTitle: "Mobile App Solutions",
		review:
			"Our experience with AnchorStackTech as a mobile app development company was very positive. They handled everything professionally, from planning to delivery, and created a mobile application that matched our goals perfectly.",
		reviewerName: "Laura Mitchell",
		reviewerRole: "Operations Manager, SwiftRoute Logistics",
		reviewerAvatar: "/home/user3.jpg",
		rating: 5,
		backgroundImage: "/home/home2.webp",
	},
	{
		id: "erp-business-systems-review",
		serviceTitle: "ERP & Business Systems",
		review:
			"AnchorStackTech helped us improve our ERP and business systems with a practical and well-structured approach. Their team understood our workflow challenges and delivered software solutions that reduced manual work and improved daily operations.",
		reviewerName: "Ahmed Rahman",
		reviewerRole: "Operations Director, Delta Distribution",
		reviewerAvatar: "/home/user4.jpg",
		rating: 5,
		backgroundImage: "/services/services10.jpg",
	},
	{
		id: "erp-software-review",
		serviceTitle: "ERP & Business Systems",
		review:
			"If you need ERP software solutions for business automation, AnchorStackTech is a strong partner. They helped us streamline internal processes, improve reporting, and make our operations much more efficient.",
		reviewerName: "David Romero",
		reviewerRole: "Finance & Operations Manager, Urban Retail Group",
		reviewerAvatar: "/home/user5.jpg",
		rating: 5,
		backgroundImage: "/home/home2.webp",
	},
	{
		id: "blockchain-solutions-review",
		serviceTitle: "Blockchain Solutions",
		review:
			"AnchorStackTech provided professional blockchain development services and delivered a secure, reliable platform for our project. Their team was knowledgeable, responsive, and very good at turning complex requirements into practical solutions.",
		reviewerName: "Olivia Hayes",
		reviewerRole: "Co-Founder, NovaChain Labs",
		reviewerAvatar: "/home/user6.jpg",
		rating: 5,
		backgroundImage: "/home/home2.webp",
	},
	{
		id: "blockchain-development-review",
		serviceTitle: "Blockchain Solutions",
		review:
			"We were impressed by AnchorStackTech’s blockchain development expertise. They built a stable and scalable solution that supported our business goals while keeping the process clear and easy to follow for our team.",
		reviewerName: "Marcus Allen",
		reviewerRole: "Founder, Web3 Product Studio",
		reviewerAvatar: "/home/user7.jpg",
		rating: 5,
		backgroundImage: "/home/home2.webp",
	},
	{
		id: "ai-solutions-review",
		serviceTitle: "AI Solutions",
		review:
			"AnchorStackTech delivered practical AI solutions that helped us automate tasks and improve internal efficiency. Their team focused on real business value, and the final result felt useful, scalable, and easy for our staff to adopt.",
		reviewerName: "Jason Reed",
		reviewerRole: "Head of Innovation, Axis Support Group",
		reviewerAvatar: "/home/user8.jpg",
		rating: 5,
		backgroundImage: "/home/work4.jpg",
	},
	{
		id: "ai-development-review",
		serviceTitle: "AI Solutions",
		review:
			"As an AI development company, AnchorStackTech impressed us with both technical skill and business understanding. They created intelligent workflow features that improved response times and supported better decision-making across our team.",
		reviewerName: "Claire Martin",
		reviewerRole: "Head of Innovation, VeloGrid",
		reviewerAvatar: "/home/user9.jpg",
		rating: 5,
		backgroundImage: "/home/home2.webp",
	},
	{
		id: "desktop-software-review",
		serviceTitle: "Desktop Software",
		review:
			"AnchorStackTech built dependable desktop software for our internal operations. The application is stable, secure, and designed around the way our team actually works, which made adoption much easier than we expected.",
		reviewerName: "Emily Carter",
		reviewerRole: "IT Lead, CoreOps Systems",
		reviewerAvatar: "/home/user10.jpg",
		rating: 5,
		backgroundImage: "/home/home2.webp",
	},
	{
		id: "desktop-development-review",
		serviceTitle: "Desktop Software",
		review:
			"We needed a desktop software development partner who could modernize an important internal system, and AnchorStackTech delivered excellent results. Their solution improved usability, speed, and workflow efficiency for our team.",
		reviewerName: "Hannah Brooks",
		reviewerRole: "Technical Operations Manager, Northgate Manufacturing",
		reviewerAvatar: "/home/user11.jpg",
		rating: 5,
		backgroundImage: "/home/home2.webp",
	},
];

export const socialLinks = [
	{ label: "Facebook", url: "https://www.facebook.com/nelson.hermance.3/" },
	{ label: "Twitter", url: "https://x.com/nhermanc" },
	{ label: "LinkedIn", url: "https://www.linkedin.com/in/nelson-hermance-a7a67410/" },
	// { label: "Discord", url: "https://discord.com/" },
	// { label: "Instagram", url: "https://www.instagram.com/" },
	// { label: "TikTok", url: "https://www.tiktok.com/" },
];

export const getServiceBySlug = (slug: string) =>
	serviceItems.find((service) => service.slug === slug);

export const getWorkProjectBySlug = (slug: string) =>
	workProjectItems.find((project) => project.slug === slug);
