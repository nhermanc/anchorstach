/** @format */

/**
 * Per-route SEO keywords (supplement global `companyInfo.seoKeywords` in `_app`).
 * Google mainly uses titles, descriptions, and page content; keywords meta helps
 * some crawlers and keeps messaging consistent across pages.
 */
export const pageKeywords = {
	home: [
		"AnchorStackTech",
		"software development company Chicago",
		"custom software development Illinois",
		"web development Chicago",
		"mobile app development",
		"iOS Android development",
		"Odoo ERP Chicago",
		"blockchain development company",
		"AI integration services",
		"desktop application development",
		"hire software developers Chicago",
		"IT consulting Chicago",
		"full stack development",
		"enterprise software",
	].join(", "),

	services: [
		"software development services",
		"web application development",
		"mobile app development services",
		"Odoo implementation",
		"ERP customization",
		"blockchain solutions",
		"machine learning integration",
		"API development",
		"cloud software",
		"AnchorStackTech services",
		"Chicago software agency",
	].join(", "),

	contact: [
		"contact software developers",
		"AnchorStackTech contact",
		"Chicago IL software company",
		"request project quote",
		"software consultation",
		"hello@anchorstacktech.com",
	].join(", "),

	about: [
		"about AnchorStackTech",
		"software development team Chicago",
		"custom software company mission",
		"technology partner",
	].join(", "),

	work: [
		"software portfolio",
		"web development case studies",
		"mobile app projects",
		"AnchorStackTech work",
		"client projects",
	].join(", "),

	blog: [
		"software development blog",
		"web development articles",
		"tech tutorials",
		"Odoo tips",
		"AI software insights",
	].join(", "),

	hireUs: [
		"hire software developers",
		"outsource development",
		"dedicated development team",
		"project estimation",
		"Chicago developers",
	].join(", "),

	howWeWork: [
		"software development process",
		"agile development",
		"discovery design development",
		"software delivery methodology",
	].join(", "),

	scheduleMeeting: [
		"book software consultation",
		"schedule development meeting",
		"AnchorStackTech meeting",
	].join(", "),

	liveChat: [
		"WhatsApp software support",
		"chat with developers",
	].join(", "),

	serviceDetail: [
		"software service details",
		"custom development scope",
		"AnchorStackTech",
	].join(", "),

	workDetail: [
		"software project case study",
		"development portfolio",
	].join(", "),

	blogDetail: [
		"software article",
		"technology blog AnchorStackTech",
	].join(", "),
} as const;
