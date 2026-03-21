# reCAPTCHA + static site (contact / hire us)

The marketing site is built with **`next export`** (folder **`deploy/`**). **Static hosting cannot run Next.js API routes**, so **`POST /api/submit-inquiry` must run somewhere else.**

## Recommended approach (no Vercel)

Use the **standalone Node server** in this repo — **`servers/contact-submit/`**. It verifies Google reCAPTCHA and forwards to Web3Forms (same idea as `pages/api/submit-inquiry.ts`). **Preferred host: [Render](https://render.com/)** — step-by-step in **`servers/contact-submit/README.md`**.

| Where | What you deploy |
|-------|------------------|
| IONOS (static) | `npm run build:deploy` → **`deploy/`** |
| **Render** (or Railway, Docker, …) | **`servers/contact-submit/`** |

### Steps

1. **Google reCAPTCHA** — [Admin console](https://www.google.com/recaptcha/admin): v2 “I’m not a robot” for **`yourdomain.com`** and **`www.yourdomain.com`**. (You do not list the API host — the widget only runs on the public site.)

2. **Deploy `servers/contact-submit` on Render** — Follow **`servers/contact-submit/README.md`**. Set **`RECAPTCHA_SECRET_KEY`**, **`SITE_URL`**, and optionally **`WEB3FORMS_ACCESS_KEY`**.

3. **Point the static build at the API** — On IONOS / CI, when running **`npm run build:deploy`**:

   ```bash
   NEXT_PUBLIC_CONTACT_SUBMIT_API_URL=https://YOUR-SERVICE.onrender.com/api/submit-inquiry
   ```

   Use the **exact** HTTPS URL Render shows (no trailing slash).

4. **Public site key** — Default site key is in **`next.config.js`**. Override with **`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`** if you rotate keys.

5. **`NEXT_PUBLIC_SITE_URL`** — Set to your canonical URL when building the static site (sitemap + default `contact-api.*` URL if you omit `NEXT_PUBLIC_CONTACT_SUBMIT_API_URL`).

## URL the browser uses

`lib/contact-submit-endpoint.ts` resolves the POST target in this order:

1. **`NEXT_PUBLIC_CONTACT_SUBMIT_API_URL`** if set → use this (required for **Render** URLs like `*.onrender.com`).
2. **Local dev** (`localhost` / `127.0.0.1`) → same-origin **`/api/submit-inquiry`** (Next **`next dev`**).
3. **Else** → **`https://contact-api.<apex>/api/submit-inquiry`** from `NEXT_PUBLIC_SITE_URL` — only if you put a server at that hostname (optional).

For most setups, **set `NEXT_PUBLIC_CONTACT_SUBMIT_API_URL` explicitly** so you don’t depend on a `contact-api` subdomain.

## CORS (standalone server)

The standalone server allows origins from **`SITE_URL`** (apex + `www`), or **`CONTACT_ALLOWED_ORIGINS`** (comma-separated) if set.

## Local Next.js development

With **`next dev`**, the app can use same-origin **`/api/submit-inquiry`** from **`pages/api/submit-inquiry.ts`**. Add **`RECAPTCHA_SECRET_KEY`** to **`.env.local`**.

## Optional: full Next.js API elsewhere

If you already run **`next start`** (or similar) for this repo on another host, you can use **`POST /api/submit-inquiry`** there instead of the standalone server — same contract and CORS rules as in **`lib/submit-inquiry-cors.ts`**.
