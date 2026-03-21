# Site assistant (AI chat) + static hosting

The marketing site is **static** (`next export`). The chat **widget** ships in the JS bundle; the **LLM** is called only from your **Render** service (`servers/contact-submit/server.mjs` → `POST /api/site-chat`) so API keys never appear in the browser.

## ChatGPT Plus / Pro vs your website

**ChatGPT Plus or Pro** is a subscription for **chat.openai.com**. It does **not** include the **OpenAI API** for embedding a bot on your own site. The API is a separate product and normally billed per use.

**You do not need to pay OpenAI** for this feature if you use **Groq** (below).

## Free option: Groq (recommended)

[Groq](https://console.groq.com/) offers a **free API tier** (rate limits apply) and an **OpenAI-compatible** chat endpoint. This repo **prefers `GROQ_API_KEY`** when it is set; otherwise it uses **`OPENAI_API_KEY`**.

1. Sign up at **[console.groq.com](https://console.groq.com/)** → **API Keys** → create a key.
2. On **Render**, set **`GROQ_API_KEY`** (secret). You can omit **`OPENAI_API_KEY`**.
3. Optional: **`GROQ_MODEL`** — default **`llama-3.1-8b-instant`** (see Groq docs for current model IDs).
4. Redeploy the service.

To **force** a provider: **`SITE_CHAT_LLM=groq`** or **`SITE_CHAT_LLM=openai`**.

## Paid option: OpenAI

Set **`OPENAI_API_KEY`** on Render (and optionally **`OPENAI_MODEL`**, default **`gpt-4o-mini`**). If **both** Groq and OpenAI keys exist and `SITE_CHAT_LLM` is unset, **Groq wins**.

## Behavior

- The model receives **`site-chat-knowledge.txt`** as context and is instructed to answer **only** from that knowledge.
- If the question is off-topic or needs a human, the model ends with `[[SUGGEST_CONTACT]]`. The server strips that marker and returns `suggestContact: true`; the widget shows **Open contact form** + email.
- **Rate limit:** about **40 requests / hour / IP** on the server (in-memory; resets on cold start on free tier).

## Static build

- Default **`NEXT_PUBLIC_SITE_CHAT_API_URL`** is derived from **`NEXT_PUBLIC_CONTACT_SUBMIT_API_URL`** (same host, path `/api/site-chat`). Override if needed.
- Hide the widget: **`NEXT_PUBLIC_SITE_CHAT_ENABLED=0`** at build time.

## Local `next dev`

Add to **`.env.local`** either:

- **`GROQ_API_KEY`** (free), or  
- **`OPENAI_API_KEY`**

The widget calls same-origin **`/api/site-chat`** (`pages/api/site-chat.ts`), which reads **`servers/contact-submit/site-chat-knowledge.txt`**.

## Editing answers

Update **`servers/contact-submit/site-chat-knowledge.txt`** and redeploy the API (and rebuild the site only if you change widget copy or env).
