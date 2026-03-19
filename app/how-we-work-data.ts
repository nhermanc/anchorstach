export type HowWeWorkStep = {
	id: string;
	stepNumber: string;
	title: string;
	description: string;
	image: string;
	learnMoreLink?: string;
};

export const howWeWorkSteps: HowWeWorkStep[] = [
	{
		id: "discovery",
		stepNumber: "01",
		title: "Discovery & Planning",
		description:
			"We start by understanding your business goals, technical requirements, and success metrics. Our team conducts workshops, stakeholder interviews, and requirement analysis to create a clear project roadmap.",
		image: "/home/work1.jpg",
		learnMoreLink: "/contact",
	},
	{
		id: "design",
		stepNumber: "02",
		title: "Design & Prototyping",
		description:
			"Our designers create wireframes, user flows, and high-fidelity prototypes. You'll see and interact with the product vision before a single line of code is written, ensuring alignment from day one.",
		image: "/home/work2.jpg",
		learnMoreLink: "/services",
	},
	{
		id: "development",
		stepNumber: "03",
		title: "Development & Testing",
		description:
			"We build your solution using agile sprints with regular demos. Our developers follow best practices, write clean code, and integrate continuous testing to deliver a robust, scalable product.",
		image: "/home/work3.jpg",
		learnMoreLink: "/work",
	},
	{
		id: "deployment",
		stepNumber: "04",
		title: "Deployment & Support",
		description:
			"We handle launch, monitoring, and ongoing support. From production deployment to performance optimization and maintenance, we ensure your platform runs smoothly and evolves with your needs.",
		image: "/home/work4.jpg",
		learnMoreLink: "/contact",
	},
];
