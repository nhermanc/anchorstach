/** @format */

import styled from "styled-components";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ChatIcon from "@material-ui/icons/Chat";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CallIcon from "@material-ui/icons/Call";
import HomeIcon from "@material-ui/icons/Home";
import EmailIcon from "@material-ui/icons/Email";
import { FC, memo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { companyInfo } from "../../app/company-data";
import { getContactRecaptchaSiteKey } from "../../lib/contact-recaptcha";
import { submitContactMessage } from "../../lib/submit-contact-form";
import ContactRecaptchaWidget from "./contact-recaptcha-widget";

type UserSubmitForm = {
	name: string;
	email: string;
	subject: string;
};

const ContactFormComponent: FC = () => {
	const router = useRouter();
	const recaptchaRef = useRef<ReCAPTCHA>(null);
	const [submitState, setSubmitState] = useState<{
		loading: boolean;
		successMessage: string;
		errorMessage: string;
	}>({
		loading: false,
		successMessage: "",
		errorMessage: "",
	});

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		email: Yup.string()
			.required("Email is required")
			.email("Email is invalid"),
		subject: Yup.string()
			.required("Subject is required")
			.min(6, "Subject must be at least 6 characters")
			.max(7000, "Subject must not exceed 7000 characters"),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UserSubmitForm>({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = async (data: UserSubmitForm) => {
		setSubmitState({
			loading: true,
			successMessage: "",
			errorMessage: "",
		});

		const siteKey = getContactRecaptchaSiteKey();
		let recaptchaToken: string | undefined;
		if (siteKey) {
			recaptchaToken = recaptchaRef.current?.getValue() || undefined;
			if (!recaptchaToken) {
				setSubmitState({
					loading: false,
					successMessage: "",
					errorMessage: "Please complete the reCAPTCHA verification.",
				});
				return;
			}
		}

		try {
			await submitContactMessage({
				name: data.name,
				email: data.email,
				subject: data.subject,
				emailSubject: `New contact form message from ${data.name}`,
				...(recaptchaToken ? { recaptchaToken } : {}),
			});

			reset();
			recaptchaRef.current?.reset();
			setSubmitState({
				loading: false,
				successMessage:
					"Message sent successfully. We will contact you soon.",
				errorMessage: "",
			});
		} catch (error: any) {
			recaptchaRef.current?.reset();
			setSubmitState({
				loading: false,
				successMessage: "",
				errorMessage:
					error?.name === "AbortError"
						? "Request timed out. Please try again."
						: error?.message ||
							"Unable to send message right now. Please try again shortly.",
			});
		}
	};

	return (
		<Wrapper>
			<AbsoluteContainer>
				<CustomContainer>
					<div className='content-container'>
						<div className='content' style={{alignContent: "center"	}}>
							<ArrowsWrapper>
								<Arrows className='first'>
									<ChatIcon
										style={{ color: "white", fontSize: "1.7rem" }}
									/>
								</Arrows>
							</ArrowsWrapper>
							<h2 style={{textAlign: "center"}}>Live Chat</h2>
							<p>Click the button to start</p>
							<CustomButton
								type='button'
								onClick={() => {
									router.push("/live-chat");
								}}>
								CHAT WITH US
							</CustomButton>
						</div>

						<div className='content'>
							<ArrowsWrapper>
								<Arrows className='first'>
									<KeyboardArrowDownIcon
										style={{ color: "white", fontSize: "1.7rem" }}
									/>
								</Arrows>
							</ArrowsWrapper>
							<h2>Submit a Request</h2>
							<p>Send a request directly to us</p>
							<CustomButton
								type='button'
								onClick={() => {
									window.scrollTo({ top: 460, behavior: "smooth" });
								}}>
								SUBMIT
							</CustomButton>
						</div>

						<div className='content'>
							<ArrowsWrapper>
								<Arrows className='first'>
									<ScheduleIcon
										style={{ color: "white", fontSize: "1.7rem" }}
									/>
								</Arrows>
							</ArrowsWrapper>
							<h2>Schedule a Meeting</h2>
							<p>Book a Google Calendar meeting</p>
							<CustomButton
								type='button'
								onClick={() => {
									router.push("/schedule-meeting");
								}}>
								SCHEDULE
							</CustomButton>
						</div>
					</div>
				</CustomContainer>
			</AbsoluteContainer>

			<BottomWrapper>
				<CustomContainer>
					<ContactContainer>
						<ContactInfo>
							<div className='first'>
								<h2>CONTACT</h2>
								<p className='head-p'>
									You can contact us with the contact below
								</p>

								<div className='first-contact'>
									<ArrowsWrapper>
										<ModifiedArrows className='first'>
											<EmailIcon style={{ color: "white" }} />
										</ModifiedArrows>
									</ArrowsWrapper>
									<p>{companyInfo.email}</p>
								</div>

								<div className='first-contact'>
									<ArrowsWrapper>
										<ModifiedArrows className='first'>
											<CallIcon style={{ color: "white" }} />
										</ModifiedArrows>
									</ArrowsWrapper>
									<p>
										<a
											className='contact-link'
											href={`tel:${companyInfo.phoneTel}`}
											aria-label={`Call ${companyInfo.phone}`}>
											{companyInfo.phone}
										</a>
										<span className='phone-note'> (Google Voice)</span>
									</p>
								</div>
								<div className='first-contact'>
									<ArrowsWrapper>
										<ModifiedArrows className='first'>
											<HomeIcon style={{ color: "white" }} />
										</ModifiedArrows>
									</ArrowsWrapper>
									<p>
										<a
											className='contact-link'
											href={companyInfo.officeMapOpenUrl}
											target='_blank'
											rel='noopener noreferrer'>
											{companyInfo.address}
										</a>
									</p>
								</div>
							</div>
						</ContactInfo>

						<ContactForm>
							<section>
								<h1>GET IN TOUCH</h1>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className='control'>
										{errors.name && (
											<p className='error-is-invalid'>
												{errors.name?.message}
											</p>
										)}
										{!errors.name && (
											<label htmlFor='name'> Name</label>
										)}

										<input
											type='text'
											id='name'
											placeholder={errors.name ? "" : "Full Name"}
											{...register("name")}
											className={` ${
												errors.name ? "is-invalid" : ""
											}`}
										/>
									</div>

									<div className='control'>
										{!errors.email && (
											<label htmlFor='email'> Email</label>
										)}

										{errors.email && (
											<p className='error-is-invalid'>
												{errors.email.message}
											</p>
										)}

										<input
											type='text'
											id='email'
											placeholder={
												errors.email ? "" : "Email Address"
											}
											className={` ${
												errors.email ? "is-invalid" : "custom-input"
											}`}
											{...register("email")}
										/>
									</div>

									<div className='control'>
										{!errors.subject && (
											<label htmlFor='subject'>Subject </label>
										)}

										{errors.subject && (
											<p className='error-is-invalid'>
												{errors.subject?.message}
											</p>
										)}
										<textarea
											id='subject'
											{...register("subject")}
											rows={4}
											cols={50}
											name='subject'
											placeholder={
												errors.subject ? "" : "Detail Project"
											}
											className={` ${
												errors.email ? "is-invalid" : "custom-input"
											}`}></textarea>
									</div>
									{getContactRecaptchaSiteKey() ? (
										<div className='recaptcha-slot'>
											<ContactRecaptchaWidget ref={recaptchaRef} />
											<p className='recaptcha-hint'>
												Google often verifies with a single click—image
												challenges only appear when needed. If submit fails,
												check the message below and try again.
											</p>
										</div>
									) : null}
									<div className='actions'>
										<SubmitButton
											type='submit'
											disabled={submitState.loading}>
											{submitState.loading ? "SENDING..." : "SUBMIT"}
										</SubmitButton>
									</div>
									{submitState.successMessage && (
										<p className='submit-success'>
											{submitState.successMessage}
										</p>
									)}
									{submitState.errorMessage && (
										<p className='submit-error'>
											{submitState.errorMessage}
										</p>
									)}
								</form>
							</section>
						</ContactForm>
					</ContactContainer>

					<MapSection aria-labelledby='contact-map-heading'>
						<h2 id='contact-map-heading'>Visit us</h2>
						<p className='map-intro'>
							Chicago office (Fischer Software Company / AnchorStackTech).{" "}
							<a
								href={companyInfo.officeMapOpenUrl}
								target='_blank'
								rel='noopener noreferrer'>
								Open in Google Maps
							</a>
						</p>
						<MapFrameWrap>
							<iframe
								title='Map: AnchorStackTech office, 6550 N Damen Ave, Chicago'
								src={companyInfo.officeMapEmbedUrl}
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'
								allowFullScreen
							/>
						</MapFrameWrap>
					</MapSection>
				</CustomContainer>
			</BottomWrapper>

		</Wrapper>
	);
};

export default memo(ContactFormComponent);

const Wrapper = styled.div`
	width: 100%;
	background: #e5e5e5;
	position: relative;
	padding-bottom: 4rem;
`;

const ContactContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const CustomContainer = styled.div`
	width: 100%;
	max-width: var(--max-width1250);
	overflow: visible;
	margin: 0 auto;
`;

const BottomWrapper = styled.div`
	padding: 5rem 9%;
	min-height: 100vh;

	@media (min-width: 768px) {
		padding: 8rem 9% !important;
		padding-bottom: 3rem !important;
	}
`;

const ContactInfo = styled.div`
	margin-bottom: 3rem;
	@media (max-width: 400px) {
		display: none;
	}
	h2 {
		margin-bottom: 2rem;
		color: var(--color-secondary-second);
	}
	p.head-p {
		font-size: 1.2rem;
		margin-bottom: 2rem;
		font-weight: 700;
		@media (min-width: 768px) {
			font-size: 2rem;
			max-width: 387px;
			font-weight: bold;
			margin-bottom: 2.2rem;
		}
		@media (max-width: 768px) {
			margin-bottom: 1rem;
		}
	}
	.first-contact {
		display: flex;
		min-height: 40px;
		margin-top: 2rem;
		align-items: center;
		@media (max-width: 568px) {
			margin-top: 1rem;
		}
		@media (max-width: 400px) {
			display: none;
		}
		p {
			font-size: 1rem;
			font-weight: normal;
		}
		.contact-link {
			color: inherit;
			text-decoration: underline;
			text-underline-offset: 2px;
		}
		.contact-link:hover {
			color: var(--color-secondary);
		}
		.phone-note {
			color: #6f6d85;
			font-size: 0.9rem;
		}
	}
`;

const MapSection = styled.section`
	width: 100%;
	margin-top: 3rem;
	padding-top: 2rem;
	border-top: 1px solid #d0d5e0;

	h2 {
		margin-bottom: 0.75rem;
		color: var(--color-secondary-second);
		font-size: 1.5rem;
	}

	.map-intro {
		color: #6f6d85;
		line-height: 1.6;
		margin-bottom: 1rem;
		max-width: 40rem;

		a {
			color: var(--color-secondary);
			font-weight: 600;
			text-decoration: underline;
			text-underline-offset: 2px;
		}
	}
`;

const MapFrameWrap = styled.div`
	position: relative;
	width: 100%;
	max-width: 56rem;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 12px rgba(15, 11, 51, 0.12);
	border: 1px solid #d7ddeb;
	background: #e8ecf4;

	iframe {
		display: block;
		width: 100%;
		height: min(420px, 55vw);
		min-height: 280px;
		border: 0;
	}
`;

const ContactForm = styled.div`
	background: #ffffff;
	min-height: 0;
	height: auto;
	overflow: visible;
	color: #0f0b33;
	width: 100%;
	max-width: 35.625rem;
	border-radius: 6px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	padding: 2rem;
	padding-bottom: 2.5rem;

	position: relative;
	z-index: 3;
	h1 {
		font-weight: 700;
		color: var(--color-secondary-second);
		margin-bottom: 2rem;
	}
	.control {
		margin-bottom: 1rem;
	}
	.control label {
		display: block;
		color: #0f0b33;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}
	.control input {
		height: 3.1rem;
	}
	.control textarea {
		height: 7.5rem;
		resize: none;
	}
	.control textarea,
	.control input {
		width: 100%;
		background: #f5f7fb;
		backdrop-filter: blur(100px);
		font: inherit;
		border: none;
		outline: none;
		color: #0f0b33;
		border-radius: 4px;
		border: 1px solid #d7ddeb;
		text-align: left;
		padding: 1rem;
		transition: 0.3s;
		-webkit-transition: 0.3s;
		-moz-transition: 0.3s;
		-ms-transition: 0.3s;
		-o-transition: 0.3s;
		&:hover {
			background: #eef3fb;
			border: 1px solid #b8c4df;
		}

		::placeholder {
			/* Chrome, Firefox, Opera, Safari 10.1+ */
			color: white;
			color: #6f6d85;
			opacity: 1; /* Firefox */
		}

		:-ms-input-placeholder {
			/* Internet Explorer 10-11 */
			color: white;
			color: #6f6d85;
		}

		::-ms-input-placeholder {
			/* Microsoft Edge */
			color: white;
			color: #6f6d85;
		}
	}
	.recaptcha-slot {
		margin-top: 1rem;
		min-height: 78px;
		overflow: visible;
		position: relative;
		z-index: 4;
	}
	.recaptcha-hint {
		font-size: 0.75rem;
		color: #6f6d85;
		line-height: 1.35;
		margin-top: 0.5rem;
		max-width: 304px;
	}
	.actions {
		margin-top: 1rem;
	}
	.submit-success {
		margin-top: 1rem;
		color: #6ff5d5;
	}
	.submit-error {
		margin-top: 1rem;
		color: #ff9700;
	}

	.control .error-is-invalid {
		color: red;
		color: #ff9700;
		transition: 0.3s;
	}

	.control .is-invalid,
	.control .touched.invalid {
		border-color: red;
		background: #ffc2c2;
		box-shadow: none;
		color: white;
		color: #0f0b33;
		transition: 0.3s;
	}
`;

const ArrowsWrapper = styled.div`
	display: flex;
	align-items: center;
	.first {
		background: var(--color-secondary);
		border: 1px solid var(--color-secondary);
		margin-right: 2rem;
		&:hover {
			background: rgba(15, 11, 51, 0.9);
			border-color: rgba(15, 11, 51, 0.9);
		}
	}
	.second {
		background: var(--color-secondary);
		border: 1px solid var(--color-secondary);
		&:hover {
			background: rgba(0, 208, 176, 0.7);
			border-color: rgba(0, 208, 176, 0.7);
		}
	}
`;

const Arrows = styled.div`
	margin-top: 2rem;
	background: var(--color-secondary-second);
	width: 50px;
	height: 50px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const ModifiedArrows = styled(Arrows)`
	margin-top: 0rem;
	width: 40px;
	height: 40px;
	border-color: var(--color-secondary) !important;
	background: var(--color-secondary) !important;
	@media (max-width: 568px) {
		display: none;
	}
`;

const AbsoluteContainer = styled.div`
	position: relative;
	padding: 10rem 9% 0;
	.content-container {
		min-height: 240px;
		width: 100%;
		padding: 2rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;

		.content {
			min-height: 160px;
			min-width: 240px;
			flex: 1;
			display: grid;
			place-items: center;
			overflow: hidden;
			h2 {
				font-size: 24px;
				font-weight: 700;
			}
			p {
				color: #6f6d85;
			}
		}
	}
`;

const CustomButton = styled.button`
	display: block;
	width: 148px;
	height: 48px;
	font: inherit;
	font-size: 0.9rem;
	cursor: pointer;
	font-weight: bold;
	background-color: #0f0b33;
	border: 1px solid #0f0b33;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	-ms-border-radius: 4px;
	-o-border-radius: 4px;
	transition-duration: var(--transition-duration);
	min-width: fit-content;
	color: white;
	margin-top: 2rem;
	&:hover {
		background: #1d1852;
		border-color: #1d1852;
	}
	&:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}
`;

/** Tighter top margin so reCAPTCHA + submit stay visible in the card */
const SubmitButton = styled(CustomButton)`
	margin-top: 0.75rem;
`;
