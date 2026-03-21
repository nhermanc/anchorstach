/** @format */

import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { companyInfo } from "../../app/company-data";
import { getSiteChatApiUrl, isSiteChatEnabled } from "../../lib/site-chat-endpoint";

type ChatTurn = { role: "user" | "assistant"; content: string };

type ApiOk = { success: true; reply: string; suggestContact: boolean };
type ApiErr = { success: false; message: string };

const SiteChatWidget: React.FC = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<ChatTurn[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showContactHint, setShowContactHint] = useState(false);
	const listRef = useRef<HTMLDivElement>(null);

	const enabled = isSiteChatEnabled();
	const hidden =
		router.pathname.startsWith("/admin") || !enabled;

	const scrollToBottom = useCallback(() => {
		const el = listRef.current;
		if (el) {
			el.scrollTop = el.scrollHeight;
		}
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages, open, scrollToBottom]);

	if (hidden) {
		return null;
	}

	const send = async () => {
		const text = input.trim();
		if (!text || loading) return;

		setError("");
		setInput("");
		const nextMessages: ChatTurn[] = [...messages, { role: "user", content: text }];
		setMessages(nextMessages);
		setLoading(true);
		setShowContactHint(false);

		try {
			const url = getSiteChatApiUrl();
			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					messages: nextMessages.map((m) => ({
						role: m.role,
						content: m.content,
					})),
				}),
				mode: "cors",
			});

			const data = (await res.json()) as ApiOk | ApiErr;
			if (!res.ok || !data.success) {
				const msg =
					(data as ApiErr).message ||
					"Something went wrong. Please use the contact page.";
				setError(msg);
				setShowContactHint(true);
				return;
			}

			const ok = data as ApiOk;
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: ok.reply },
			]);
			setShowContactHint(ok.suggestContact);
		} catch {
			setError(
				"Could not reach the assistant. Check your connection or try the contact form.",
			);
			setShowContactHint(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Fab
				type='button'
				aria-label={open ? "Close chat" : "Open chat"}
				aria-expanded={open}
				onClick={() => setOpen((o) => !o)}>
				{open ? <CloseIcon /> : <ChatIcon />}
			</Fab>

			{open && (
				<Panel role='dialog' aria-label='Site assistant'>
					<PanelHeader>
						<div>
							<PanelTitle>{companyInfo.name}</PanelTitle>
							<PanelSubtitle>Assistant · general questions</PanelSubtitle>
						</div>
						<HeaderClose
							type='button'
							aria-label='Close'
							onClick={() => setOpen(false)}>
							<CloseIcon fontSize='small' />
						</HeaderClose>
					</PanelHeader>

					<Disclaimer>
						Answers use our published information only. For quotes, NDA, or
						custom scopes, use{" "}
						<Link href='/contact' passHref>
							<InlineA>Contact</InlineA>
						</Link>
						.
					</Disclaimer>

					<MessageList ref={listRef} tabIndex={0}>
						{messages.length === 0 && (
							<Welcome>
								Ask about our services, location, or how to get started. If
								your question needs our team directly, we&apos;ll point you to
								the contact form.
							</Welcome>
						)}
						{messages.map((m, i) => (
							<Bubble key={`${i}-${m.role}`} $role={m.role}>
								{m.content}
							</Bubble>
						))}
						{loading && <Typing>Thinking…</Typing>}
					</MessageList>

					{showContactHint && (
						<ContactHint>
							<p>
								<strong>Talk to our team</strong> — we&apos;ll respond on email
								or schedule a call.
							</p>
							<Link href='/contact' passHref>
								<HintA>Open contact form</HintA>
							</Link>
							<MailLink href={`mailto:${companyInfo.email}`}>
								{companyInfo.email}
							</MailLink>
						</ContactHint>
					)}

					{error && <ErrorLine role='alert'>{error}</ErrorLine>}

					<Composer onSubmit={(e) => e.preventDefault()}>
						<ComposerInput
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									void send();
								}
							}}
							placeholder='Type your question…'
							rows={2}
							disabled={loading}
							aria-label='Message'
						/>
						<SendBtn
							type='button'
							onClick={() => void send()}
							disabled={loading || !input.trim()}
							aria-label='Send'>
							<SendIcon />
						</SendBtn>
					</Composer>
				</Panel>
			)}
		</>
	);
};

export default SiteChatWidget;

const Fab = styled.button`
	position: fixed;
	right: 1.25rem;
	bottom: 5.5rem;
	width: 3.5rem;
	height: 3.5rem;
	border-radius: 50%;
	border: none;
	background: #0f0b33;
	color: white;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4px 18px rgba(15, 11, 51, 0.35);
	z-index: 9999990;
	transition: transform 0.2s, background 0.2s;

	&:hover {
		background: #1d1852;
		transform: scale(1.04);
	}

	@media (min-width: 768px) {
		right: 2rem;
		bottom: 6rem;
	}
`;

const Panel = styled.div`
	position: fixed;
	right: 1rem;
	bottom: 5rem;
	width: min(100vw - 2rem, 22rem);
	max-height: min(32rem, calc(100vh - 7rem));
	display: flex;
	flex-direction: column;
	background: #ffffff;
	border-radius: 12px;
	box-shadow: 0 8px 32px rgba(15, 11, 51, 0.2);
	border: 1px solid #e1e6f2;
	z-index: 9999989;
	overflow: hidden;

	@media (min-width: 768px) {
		right: 1.75rem;
		bottom: 6.25rem;
		width: 24rem;
		max-height: min(34rem, calc(100vh - 8rem));
	}
`;

const PanelHeader = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding: 1rem 1rem 0.5rem;
	background: linear-gradient(
		135deg,
		#0f0b33 0%,
		#1a1450 100%
	);
	color: white;
`;

const PanelTitle = styled.div`
	font-family: Oswald, Poppins, sans-serif;
	font-size: 1.15rem;
	font-weight: 600;
	letter-spacing: 0.02em;
`;

const PanelSubtitle = styled.div`
	font-size: 0.72rem;
	opacity: 0.85;
	margin-top: 0.15rem;
`;

const HeaderClose = styled.button`
	background: transparent;
	border: none;
	color: white;
	cursor: pointer;
	padding: 0.25rem;
	display: flex;
	opacity: 0.9;
	&:hover {
		opacity: 1;
	}
`;

const Disclaimer = styled.p`
	font-size: 0.7rem;
	line-height: 1.4;
	color: #6f6d85;
	padding: 0.5rem 1rem;
	margin: 0;
	background: #f8fafc;
	border-bottom: 1px solid #eef2f7;
`;

const InlineA = styled.a`
	color: var(--color-secondary);
	font-weight: 600;
	cursor: pointer;
`;

const MessageList = styled.div`
	flex: 1;
	overflow-y: auto;
	padding: 0.75rem 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	min-height: 10rem;
`;

const Welcome = styled.p`
	font-size: 0.82rem;
	color: #6f6d85;
	line-height: 1.5;
	margin: 0;
`;

const Bubble = styled.div<{ $role: "user" | "assistant" }>`
	align-self: ${(p) => (p.$role === "user" ? "flex-end" : "flex-start")};
	max-width: 92%;
	padding: 0.55rem 0.75rem;
	border-radius: 10px;
	font-size: 0.84rem;
	line-height: 1.45;
	white-space: pre-wrap;
	word-break: break-word;
	background: ${(p) =>
		p.$role === "user" ? "var(--color-secondary)" : "#f0f4fa"};
	color: ${(p) => (p.$role === "user" ? "#0f0b33" : "#0f0b33")};
`;

const Typing = styled.div`
	font-size: 0.8rem;
	color: #6f6d85;
	font-style: italic;
`;

const ContactHint = styled.div`
	padding: 0.65rem 1rem;
	background: #fff8f0;
	border-top: 1px solid #ffe0c2;
	font-size: 0.78rem;
	color: #0f0b33;

	p {
		margin: 0 0 0.5rem;
	}

	a {
		color: var(--color-secondary);
	}
`;

const HintA = styled.a`
	display: inline-block;
	margin-right: 0.5rem;
	padding: 0.35rem 0.75rem;
	background: #0f0b33;
	color: white !important;
	border-radius: 4px;
	font-size: 0.75rem;
	font-weight: 600;
	text-decoration: none !important;
	cursor: pointer;
`;

const MailLink = styled.a`
	display: block;
	margin-top: 0.35rem;
	font-size: 0.75rem;
`;

const ErrorLine = styled.div`
	padding: 0.35rem 1rem;
	font-size: 0.75rem;
	color: #a10c4a;
	background: #fff5f8;
	border-top: 1px solid #f1acc9;
`;

const Composer = styled.form`
	display: flex;
	gap: 0.35rem;
	padding: 0.65rem;
	border-top: 1px solid #e1e6f2;
	background: #fafbfe;
	align-items: flex-end;
`;

const ComposerInput = styled.textarea`
	flex: 1;
	font: inherit;
	font-size: 0.85rem;
	border: 1px solid #d7ddeb;
	border-radius: 8px;
	padding: 0.5rem 0.65rem;
	resize: none;
	color: #0f0b33;
	background: white;
	min-height: 2.5rem;
	max-height: 5rem;

	&:focus {
		outline: 2px solid rgba(0, 208, 176, 0.35);
		border-color: var(--color-secondary);
	}
`;

const SendBtn = styled.button`
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 8px;
	border: none;
	background: #0f0b33;
	color: white;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;

	&:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	&:not(:disabled):hover {
		background: #1d1852;
	}
`;
