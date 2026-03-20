/** @format */

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import {
	FC,
	MouseEvent,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

const heroSlides = ["/home/slide1.webp", "/home/slide2.webp", "/home/slide3.webp"];

const Hero: FC = () => {
	const [activeSlide, setActiveSlide] = useState<number>(0);
	const [isPaused, setIsPaused] = useState<boolean>(false);
	const [slidesToRender, setSlidesToRender] = useState<number>(1);
	const dragStartX = useRef<number | null>(null);

	// Defer loading slides 2 and 3 until after first paint (improves LCP)
	useEffect(() => {
		const t = setTimeout(() => setSlidesToRender(3), 100);
		return () => clearTimeout(t);
	}, []);

	const ensureAllSlides = useCallback(() => {
		setSlidesToRender(heroSlides.length);
	}, [heroSlides.length]);

	const goNext = useCallback(() => {
		ensureAllSlides();
		setActiveSlide((prev) => (prev + 1) % heroSlides.length);
	}, [ensureAllSlides, heroSlides.length]);

	const goPrev = useCallback(() => {
		ensureAllSlides();
		setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
	}, [ensureAllSlides, heroSlides.length]);

	useEffect(() => {
		if (isPaused || slidesToRender < 2) {
			return;
		}
		const intervalId = window.setInterval(() => {
			setActiveSlide((prev) => (prev + 1) % heroSlides.length);
		}, 5000);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [slidesToRender, isPaused]);

	const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		dragStartX.current = event.clientX;
	};

	const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
		if (dragStartX.current === null) {
			return;
		}
		const deltaX = event.clientX - dragStartX.current;
		dragStartX.current = null;
		if (deltaX <= -40) {
			goNext();
		}
		if (deltaX >= 40) {
			goPrev();
		}
	};

	return (
		<HeroWrapper>
			<CustomContainer>
				<ContentContainer>
					<h1>
						Software solutions built for growth
					</h1>

					<p>
						<b>AnchorStackTech</b> is the next step in the journey that began with <b>Fischer Software Company</b>. <br />
						We continue the same dedication to quality, reliability, and client success while growing into a broader, future-focused technology brand.
					</p>

					<p>
						We build web and mobile applications, AI-powered solutions, business systems, blockchain products, and custom platforms tailored to your goals. 
					</p>

					<JobsContain>
						<div>
							<p className='job-success'>20+</p>
							<p>Years in Business</p>
						</div>
						<div>
							<p className='job-success'>6</p>
							<p>Core Service Areas</p>
						</div>
					</JobsContain>

					<Link href='/contact' prefetch passHref>
						<CustomButton>GET STARTED</CustomButton>
					</Link>
				</ContentContainer>

				<ImageContainer
					style={{
						position: "relative",
						cursor: "pointer",
					}}
					onMouseEnter={() => setIsPaused(true)}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onMouseLeave={() => {
						dragStartX.current = null;
						setIsPaused(false);
					}}>
					{heroSlides.slice(0, slidesToRender).map((slideSrc, index) => (
						<SlideFrame key={slideSrc} $isActive={activeSlide === index}>
							<SlideImageWrapper>
								<Image
									src={slideSrc}
									alt={
										index === 0
											? "AnchorStackTech — software and technology solutions"
											: ""
									}
									layout='fill'
									objectFit='contain'
									objectPosition='center'
									priority={index === 0}
									loading={index === 0 ? undefined : "lazy"}
									sizes='(max-width: 768px) 100vw, min(40.5rem, 45vw)'
								/>
							</SlideImageWrapper>
						</SlideFrame>
					))}
					<SliderButton
						type='button'
						className='left'
						aria-label='Previous slide'
						onClick={goPrev}>
						&#8249;
					</SliderButton>
					<SliderButton
						type='button'
						className='right'
						aria-label='Next slide'
						onClick={goNext}>
						&#8250;
					</SliderButton>
				</ImageContainer>

				<HiddenImageContainer
					onMouseEnter={() => setIsPaused(true)}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onMouseLeave={() => {
						dragStartX.current = null;
						setIsPaused(false);
					}}>
					{heroSlides.slice(0, slidesToRender).map((slideSrc, index) => (
						<SlideFrame key={`${slideSrc}-mobile`} $isActive={activeSlide === index}>
							<SlideImageWrapper>
								<Image
									src={slideSrc}
									alt={
										index === 0
											? "AnchorStackTech — software and technology solutions"
											: ""
									}
									layout='fill'
									objectFit='contain'
									objectPosition='center'
									priority={index === 0}
									loading={index === 0 ? undefined : "lazy"}
									sizes='100vw'
								/>
							</SlideImageWrapper>
						</SlideFrame>
					))}
					<SliderButton
						type='button'
						className='left'
						aria-label='Previous slide'
						onClick={goPrev}>
						&#8249;
					</SliderButton>
					<SliderButton
						type='button'
						className='right'
						aria-label='Next slide'
						onClick={goNext}>
						&#8250;
					</SliderButton>
				</HiddenImageContainer>
			</CustomContainer>
		</HeroWrapper>
	);
};

export default memo(Hero);

const HeroWrapper = styled.div`
	position: relative;
	min-height: 75vh;
	width: 100%;
	max-width: 100%;
	box-sizing: border-box;
	color: #0f0b33;
	background: #f8fafc;
	padding: 3.5rem clamp(1rem, 4vw, 9%);
	padding-top: 9rem;
	/* Stable stacking without forcing opacity on every descendant (hurts compositing / CLS). */
	isolation: isolate;

	@media (min-width: 768px) {
		padding: 4.5rem clamp(1rem, 4vw, 9%);
		padding-top: 10rem;
	}

	@media (max-width: 1199px) {
		min-height: auto;
		padding-bottom: 3rem;
	}
`;

const ContentContainer = styled.div`
	flex: 1;

	max-width: 36.1875rem;
	margin-right: 2rem;

	h1 {
		font-family: Poppins;
		font-style: normal;
		font-weight: bold;
		font-size: 3.5rem;
		line-height: 150%;
		margin-bottom: 1.5rem;
		@media (max-width: 1199px) and (min-width: 769px) {
			font-size: clamp(1.85rem, 2.5rem + 1.5vw, 3rem);
		}
		@media (max-width: 768px) {
			font-size: 2rem;
		}
		@media (max-width: 568px) {
			font-size: 1.5rem;
		}
		span {
			color: var(--color-secondary);
		}
	}
	p {
		margin: 1rem 0;
		font-style: normal;
		font-weight: normal;
		font-size: 1rem;
		line-height: var(--line-height);
		font-size: 1.1rem;
	}
	@media (max-width: 1199px) {
		max-width: 100%;
		margin-right: 0;
		width: 100%;
		flex: none;
	}
`;

const CustomContainer = styled.div`
	position: relative;
	z-index: 1;
	width: 100%;
	max-width: var(--max-width);
	overflow: hidden;
	margin: 0 auto;
	min-height: 34rem;
	display: flex;
	color: #0f0b33;
	padding-left: 4px;
	justify-content: space-between;
	align-items: flex-start;
	gap: 1.5rem;
	@media (max-width: 1199px) {
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: stretch;
		min-height: 0;
		padding-left: 0;
	}
	@media (max-width: 768px) {
		flex-wrap: wrap;
	}
`;

/* Fixed aspect box reserves space before the LCP image paints → lower CLS */
const ImageContainer = styled.div`
	flex: 1;
	position: relative;
	width: 40.5rem;
	min-width: min(40.5rem, 100%);
	max-width: 100%;
	aspect-ratio: 648 / 697;
	max-height: 43.5625rem;
	height: auto;
	min-height: 20rem;
	overflow: hidden;
	contain: layout style;
	img {
		display: block;
	}
	/* Tablet + mobile: use stacked carousel (HiddenImageContainer) */
	@media (max-width: 1199px) {
		display: none;
	}
`;

const JobsContain = styled.div`
	margin-top: 2rem;
	display: flex;
	justify-content: space-between;
	max-width: 400px;
	min-width: 300px;

	@media (max-width: 480px) {
		display: none;
	}
	.job-success {
		border-left: 2px solid var(--color-secondary);
		font-weight: bold;
		font-size: 20px;
	}
	p {
		padding-left: 1rem;
		font-size: 1rem;
	}
`;

/* Anchor for Link passHref + keyboard accessibility */
const CustomButton = styled.a`
	min-width: 190px;
	height: 48px;
	font: inherit;
	cursor: pointer;
	background-color: #0f0b33;
	border: 1px solid #0f0b33;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	transition: background-color 0.2s ease, border-color 0.2s ease;
	color: white;
	margin-top: 3rem;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	text-decoration: none;
	box-sizing: border-box;
	&:hover {
		background: #1d1852;
		border-color: #1d1852;
	}
	@media (max-width: 768px) {
		display: none;
	}
`;

const HiddenImageContainer = styled.div`
	position: relative;
	width: 100%;
	max-width: 42rem;
	margin-left: auto;
	margin-right: auto;
	height: clamp(14rem, 48vw, 24rem);
	min-height: 14rem;
	overflow: hidden;
	contain: layout style;
	margin-top: 1.5rem;
	@media (min-width: 1200px) {
		display: none;
	}
`;

/* Opacity-only crossfade: avoids transform animations that trigger layout/paint work (Lighthouse). */
const SlideFrame = styled.div<{ $isActive: boolean }>`
	position: absolute;
	inset: 0;
	opacity: ${(props) => (props.$isActive ? 1 : 0)};
	visibility: ${(props) => (props.$isActive ? "visible" : "hidden")};
	transition: opacity 0.45s ease;
	pointer-events: none;
`;

const SlideImageWrapper = styled.div`
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;

	/* Next.js Image with layout=fill renders span > img */
	span {
		position: relative !important;
		width: 100% !important;
		height: 100% !important;
		display: block !important;
	}

	img {
		width: 100% !important;
		height: 100% !important;
		object-fit: contain !important;
		object-position: center !important;
	}
`;

const SliderButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translate3d(0, -50%, 0);
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: none;
	background: rgba(15, 11, 51, 0.82);
	color: #ffffff;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 28px;
	line-height: 1;
	z-index: 3;
	transition: background-color 0.2s ease;

	&.left {
		left: 12px;
	}

	&.right {
		right: 12px;
	}

	&:hover {
		background: #0f0b33;
	}
`;

