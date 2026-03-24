# reCAPTCHA + static site (contact / hire us)

The marketing site is built with **`next export`** (folder **`deploy/`**). **Static hosting cannot run Next.js API routes**, so **Google reCAPTCHA must be verified on a small API** you host separately (e.g. **Render**).

## Why two steps (verify, then Web3Forms)

[Web3Forms’ API reference](https://docs.web3forms.com/getting-started/api-reference) recommends **browser-side** submission. **Server-side** calls from datacenter IPs (e.g. Render) are often blocked by **Cloudflare** — you may see HTTP **403** with HTML titled **“Just a moment…”**.

This repo therefore:

1. **`POST /api/verify-recaptcha`** on your API (Render or **`next dev`**) — body `{ "recaptchaToken": "..." }` — verifies the token with Google using **`RECAPTCHA_SECRET_KEY`**.
2. The **browser** then **`POST`s to `https://api.web3forms.com/submit`** with the form fields and your public access key (same as the no–reCAPTCHA static path).

## Recommended approach (no Vercel)

Use the **standalone Node server** — **`servers/contact-submit/`**. **Preferred host: [Render](https://render.com/)** — **`servers/contact-submit/README.md`**.

| Where | What you deploy |
|-------|------------------|
| IONOS (static) | `npm run build:deploy` → **`deploy/`** |
| **Render** (or Railway, Docker, …) | **`servers/contact-submit/`** |

### Steps

1. **Google reCAPTCHA** — [Admin console](https://www.google.com/recaptcha/admin): v2 “I’m not a robot” for **`yourdomain.com`** and **`www.yourdomain.com`**. (You do not list the API host — the widget only runs on the public site.)

2. **Deploy `servers/contact-submit` on Render** — Set **`RECAPTCHA_SECRET_KEY`**, **`SITE_URL`**. You do **not** need **`WEB3FORMS_ACCESS_KEY`** on Render; Web3Forms is called from the visitor’s browser.

3. **Point the static build at the API** — When running **`npm run build:deploy`**:

   ```bash
   NEXT_PUBLIC_CONTACT_SUBMIT_API_URL=https://YOUR-SERVICE.onrender.com/api/submit-inquiry
   ```

   The app **derives** **`/api/verify-recaptcha`** on the **same host** from that URL. Use the **exact** HTTPS URL (path **`/api/submit-inquiry`** is kept for backward compatibility with env examples; the live endpoint is **`/api/verify-recaptcha`**).

4. **Web3Forms access key** — Set **`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`** in the **static** build if you do not use the default in code.

5. **Public site key** — Default site key is in **`next.config.js`**. Override with **`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`** if you rotate keys.

6. **`NEXT_PUBLIC_SITE_URL`** — Canonical URL (sitemap + default `contact-api.*` URL if you omit **`NEXT_PUBLIC_CONTACT_SUBMIT_API_URL`**).

## URL the browser uses

`lib/contact-submit-endpoint.ts`:

- **`NEXT_PUBLIC_CONTACT_SUBMIT_API_URL`** — full URL ending in **`/api/submit-inquiry`** (used only to resolve the API **host**; the client calls **`/api/verify-recaptcha`** on that host).
- **Local dev** (`localhost`) → same-origin **`/api/verify-recaptcha`** (**`pages/api/verify-recaptcha.ts`**).
- **Else** → **`https://contact-api.<apex>/api/verify-recaptcha`** if you rely on the `contact-api` fallback.

## CORS (standalone server)

Allows origins from **`SITE_URL`** (apex + `www`), or **`CONTACT_ALLOWED_ORIGINS`** (comma-separated) if set.

## Local Next.js development

With **`next dev`**, add **`RECAPTCHA_SECRET_KEY`** to **`.env.local`**. The form uses **`POST /api/verify-recaptcha`**, then Web3Forms from the browser.

## Retired: `POST /api/submit-inquiry`

That route is **410 Gone** on the standalone server and Next — it used server-side Web3Forms, which breaks behind Cloudflare for many hosts. Rebuild the static site from this repo if you still see errors mentioning **`submit-inquiry`**.
