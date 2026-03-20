/** @format */

import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactDOM from "react-dom";

import BackDrop from "../ui/backdrop";

const SideBar = ({ burgerMenuStatus, SetBurgerMenuStatus, isTransparent }) => {
	const router = useRouter();
	// Portal
	return (
		<BackDrop>
			{ReactDOM.createPortal(
				<ModalOverlay
					burgerMenuStatus={burgerMenuStatus}
					onClick={() => {
						SetBurgerMenuStatus(false);
					}}>
					<IconButton style={{ marginLeft: "-1rem" }}>
						<CloseIcon
							style={{ color: "#00d0b0" }}
							onClick={() => {
								SetBurgerMenuStatus(false);
							}}
						/>
					</IconButton>
					<ul>
						<li
							onClick={() => {
								SetBurgerMenuStatus(false);
							}}>
							<Link href='/' prefetch={true} passHref>
								<a onMouseEnter={() => router.prefetch("/")}>Home</a>
							</Link>
						</li>
						<li
							onClick={() => {
								SetBurgerMenuStatus(false);
							}}>
							<Link href='/work' prefetch={true} passHref>
								<a onMouseEnter={() => router.prefetch("/work")}>
									Experiences
								</a>
							</Link>
						</li>
						<li
							onClick={() => {
								SetBurgerMenuStatus(false);
							}}>
							<Link href='/services' prefetch={true} passHref>
								<a onMouseEnter={() => router.prefetch("/services")}>
									Services
								</a>
							</Link>
						</li>
						<li
							onClick={() => {
								SetBurgerMenuStatus(false);
							}}>
							<Link href='/how-we-work' prefetch={true} passHref>
								<a
									onMouseEnter={() => router.prefetch("/how-we-work")}>
									How We Work
								</a>
							</Link>
						</li>
						<li
							onClick={() => {
								SetBurgerMenuStatus(false);
							}}>
							<Link href='/blog' prefetch={true} passHref>
								<a onMouseEnter={() => router.prefetch("/blog")}>Blog</a>
							</Link>
						</li>
						<li
							onClick={() => {
								SetBurgerMenuStatus(false);
							}}>
							<Link href='/about-us' prefetch={true}>
								<a onMouseEnter={() => router.prefetch("/about-us")}>
									About us
								</a>
							</Link>
						</li>
						<li
							onClick={() => {
								SetBurgerMenuStatus(false);
							}}>
							<Link href='/contact' prefetch={true} passHref>
								<a onMouseEnter={() => router.prefetch("/contact")}>
									Contact us
								</a>
							</Link>
						</li>
					</ul>
				</ModalOverlay>,
				document.getElementById("modal--overlay--root"),
			)}
		</BackDrop>
	);
};

export default SideBar;

const ModalOverlay = styled.div`
	transform: ${(props) =>
		props.burgerMenuStatus ? "translateX(0)" : "translateX(100%)"};
	z-index: 99999;
	position: fixed;
	top: 0;
	right: 0;
	min-height: 100vh;
	min-width: 15.75rem;
	width: 15.75rem;
	padding: 1.2rem;
	background-color: #f8fbfe;
	border-radius: 6px;
	transition: transform var(--transition-duration);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	-webkit-transition: transform var(--transition-duration);
	-moz-transition: transform var(--transition-duration);
	-ms-transition: transform var(--transition-duration);
	-o-transition: transform var(--transition-duration);
	-webkit-border-radius: 6px;
	-moz-border-radius: 6px;
	-ms-border-radius: 6px;
	-o-border-radius: 6px;
	li {
		list-style-type: none;
		padding: 1rem 0;
		border-bottom: 1px solid var(--color-secondary);
	}
	a {
		color: black;
		font-size: 1.1;
		color: black;
		cursor: pointer;
	}
`;
